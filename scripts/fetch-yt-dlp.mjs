/**
 * Replaces the yt-dlp that `youtube-dl-exec` installs with the standalone
 * build for the current platform.
 *
 * The package's postinstall downloads the plain `yt-dlp` release asset, which
 * is a Python zipapp (`#!/usr/bin/env python3` + a zip). That runs fine
 * anywhere Python is on PATH, but Vercel's Node runtime has no python3, so
 * every /youtube/clip request died with `env: 'python3': No such file or
 * directory` (exit 127) — surfaced to users as the generic "check that the
 * video is public" error.
 *
 * The `yt-dlp_linux` / `yt-dlp_macos` / `yt-dlp.exe` assets are PyInstaller
 * bundles with the interpreter baked in, so they need nothing from the host.
 *
 * We overwrite the same path the postinstall wrote to, because the endpoint
 * resolves it with `require.resolve('youtube-dl-exec/bin/yt-dlp')` and that
 * literal is what Vercel's file tracer follows when bundling the function.
 * `bin/` is not part of the published tarball (package.json `files` is
 * ["scripts", "src"]), so this never touches pnpm's content-addressed store.
 */
import { chmod, mkdir, open, rename, stat, unlink } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

const ASSETS = {
	'linux-x64': 'yt-dlp_linux',
	'linux-arm64': 'yt-dlp_linux_aarch64',
	'darwin-x64': 'yt-dlp_macos',
	'darwin-arm64': 'yt-dlp_macos',
	'win32-x64': 'yt-dlp.exe'
};

const target = `${process.platform}-${process.arch}`;
const asset = ASSETS[target];
if (!asset) {
	console.error(`[yt-dlp] no standalone build for ${target}`);
	process.exit(1);
}

const require = createRequire(import.meta.url);
const binDirectory = join(dirname(require.resolve('youtube-dl-exec/package.json')), 'bin');
const binaryPath = join(binDirectory, 'yt-dlp');

/** The zipapp starts with a shebang; every standalone build is a real executable. */
async function isStandalone(path) {
	let handle;
	try {
		handle = await open(path, 'r');
		const { buffer } = await handle.read(Buffer.alloc(2), 0, 2, 0);
		return buffer.toString('latin1') !== '#!';
	} catch {
		return false;
	} finally {
		await handle?.close();
	}
}

if (await isStandalone(binaryPath)) {
	const { size } = await stat(binaryPath);
	console.log(`[yt-dlp] standalone build already in place (${(size / 1e6).toFixed(1)} MB)`);
	process.exit(0);
}

const url = `https://github.com/yt-dlp/yt-dlp/releases/latest/download/${asset}`;
console.log(`[yt-dlp] downloading ${asset} for ${target}`);

const response = await fetch(url, { redirect: 'follow' });
if (!response.ok || !response.body) {
	throw new Error(`[yt-dlp] download failed: ${response.status} ${response.statusText}`);
}

// Write to a sibling first so a failed download can never leave a half-written
// binary at the path the server resolves.
const downloadPath = `${binaryPath}.download`;
await mkdir(binDirectory, { recursive: true });
try {
	await pipeline(Readable.fromWeb(response.body), createWriteStream(downloadPath));
	await chmod(downloadPath, 0o755);
	await rename(downloadPath, binaryPath);
} catch (cause) {
	await unlink(downloadPath).catch(() => {});
	throw cause;
}

const { size } = await stat(binaryPath);
console.log(`[yt-dlp] installed ${asset} → ${binaryPath} (${(size / 1e6).toFixed(1)} MB)`);
