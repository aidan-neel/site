import { error, json } from '@sveltejs/kit';
import { spawn } from 'node:child_process';
import { createReadStream } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import ffmpegPath from 'ffmpeg-static';
import youtubeDl from 'youtube-dl-exec';
import type { RequestHandler } from './$types';

const MAX_CLIP_SECONDS = 10 * 60;

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
	if (end - start > MAX_CLIP_SECONDS) {
		return json({ message: 'Clips can be up to 10 minutes long.' }, { status: 400 });
	}

	const directory = await mkdtemp(join(tmpdir(), 'clipper-'));
	const source = join(directory, 'source.m4a');
	const output = join(directory, 'clip.mp3');

	try {
		await youtubeDl(url, {
			noPlaylist: true,
			maxFilesize: '200M',
			format: 'bestaudio[ext=m4a]/bestaudio',
			output: source
		});
		await run(process.env.FFMPEG_PATH || ffmpegPath || 'ffmpeg', [
			'-hide_banner',
			'-loglevel',
			'error',
			'-ss',
			String(start),
			'-t',
			String(end - start),
			'-i',
			source,
			'-vn',
			'-codec:a',
			'libmp3lame',
			'-b:a',
			'320k',
			output
		]);

		const nodeStream = createReadStream(output);
		const stream = Readable.toWeb(nodeStream) as ReadableStream;
		nodeStream.on('close', () => void rm(directory, { recursive: true, force: true }));
		return new Response(stream, {
			headers: {
				'content-type': 'audio/mpeg',
				'content-disposition': 'attachment; filename="youtube-clip.mp3"',
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
