import { error, json } from '@sveltejs/kit';
import { spawn } from 'node:child_process';
import { createReadStream } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import ffmpegPath from 'ffmpeg-static';
import youtubeDlExec from 'youtube-dl-exec';
import type { RequestHandler } from './$types';

// Vercel caps functions at the plan's maxDuration (60s on Hobby); downloads
// exceed the 10s default, so raise it explicitly.
export const config = { maxDuration: 60 };

const MAX_AUDIO_CLIP_SECONDS = 10 * 60;
// Re-encoding video is CPU-bound on serverless; keep clips short enough to
// finish within maxDuration.
const MAX_VIDEO_CLIP_SECONDS = 5 * 60;

// Resolve the yt-dlp binary explicitly so Vercel's file tracer includes it in
// the function bundle. The binary is fetched by the package's postinstall,
// which pnpm only runs because it is listed in onlyBuiltDependencies.
const require = createRequire(import.meta.url);
const youtubeDl = youtubeDlExec.create(require.resolve('youtube-dl-exec/bin/yt-dlp'));
const ffmpeg = process.env.FFMPEG_PATH || ffmpegPath || 'ffmpeg';

function run(command: string, args: string[]) {
	return new Promise<void>((resolve, reject) => {
		const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] });
		let stderr = '';
		child.stderr.on('data', (chunk) => (stderr += String(chunk).slice(-4000)));
		child.on('error', reject);
		child.on('close', (code) =>
			code === 0 ? resolve() : reject(new Error(stderr || `${command} exited with code ${code}`))
		);
	});
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	const url = typeof body?.url === 'string' ? body.url : '';
	const start = Number(body?.start);
	const end = Number(body?.end);
	const format = body?.format === 'mp4' ? 'mp4' : 'mp3';
	const maxClipSeconds = format === 'mp4' ? MAX_VIDEO_CLIP_SECONDS : MAX_AUDIO_CLIP_SECONDS;

	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		return json({ message: 'That YouTube URL is not valid.' }, { status: 400 });
	}
	if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(parsed.hostname)) {
		return json({ message: 'Only YouTube links are supported.' }, { status: 400 });
	}
	if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) {
		return json({ message: 'Choose a valid start and end time.' }, { status: 400 });
	}
	if (end - start > maxClipSeconds) {
		return json(
			{
				message: `${format.toUpperCase()} clips can be up to ${maxClipSeconds / 60} minutes long.`
			},
			{ status: 400 }
		);
	}

	const directory = await mkdtemp(join(tmpdir(), 'clipper-'));
	const source = join(directory, format === 'mp4' ? 'source.mp4' : 'source.m4a');
	const output = join(directory, `clip.${format}`);

	try {
		await youtubeDl(url, {
			noPlaylist: true,
			maxFilesize: format === 'mp4' ? '400M' : '200M',
			format:
				format === 'mp4'
					? 'bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4][height<=720]/best'
					: 'bestaudio[ext=m4a]/bestaudio',
			mergeOutputFormat: 'mp4',
			ffmpegLocation: ffmpeg,
			output: source
		});

		const cutArgs = [
			'-hide_banner',
			'-loglevel',
			'error',
			'-ss',
			String(start),
			'-t',
			String(end - start),
			'-i',
			source
		];
		const encodeArgs =
			format === 'mp4'
				? [
						'-c:v',
						'libx264',
						'-preset',
						'veryfast',
						'-crf',
						'23',
						'-c:a',
						'aac',
						'-b:a',
						'192k',
						'-movflags',
						'+faststart'
					]
				: ['-vn', '-codec:a', 'libmp3lame', '-b:a', '320k'];
		await run(ffmpeg, [...cutArgs, ...encodeArgs, output]);

		const nodeStream = createReadStream(output);
		const stream = Readable.toWeb(nodeStream) as ReadableStream;
		nodeStream.on('close', () => void rm(directory, { recursive: true, force: true }));
		return new Response(stream, {
			headers: {
				'content-type': format === 'mp4' ? 'video/mp4' : 'audio/mpeg',
				'content-disposition': `attachment; filename="youtube-clip.${format}"`,
				'cache-control': 'no-store'
			}
		});
	} catch (cause) {
		await rm(directory, { recursive: true, force: true });
		console.error('Clip generation failed', cause);
		throw error(503, {
			message: 'The clip could not be exported. Check that the video is public, then try again.'
		});
	}
};
