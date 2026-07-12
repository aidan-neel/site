<script lang="ts">
	import { tick } from 'svelte';
	import './youtube.css';

	type Player = {
		playVideo: () => void;
		pauseVideo: () => void;
		seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
		getCurrentTime: () => number;
		getDuration: () => number;
		getPlayerState: () => number;
		getVideoData: () => { title?: string; author?: string };
		destroy: () => void;
	};

	type YoutubeWindow = Window & {
		YT?: {
			Player: new (
				element: string | HTMLElement,
				options: {
					videoId: string;
					playerVars: Record<string, number>;
					events: Record<string, (event: { target: Player; data: number }) => void>;
				}
			) => Player;
		};
		onYouTubeIframeAPIReady?: () => void;
	};

	const DEFAULT_DURATION = 225;
	const bars = Array.from({ length: 96 }, (_, index) => {
		const wave = Math.abs(Math.sin(index * 1.73) * 0.55 + Math.sin(index * 0.47) * 0.28);
		return Math.round(18 + wave * 68);
	});

	let url = $state('');
	let activeUrl = $state('');
	let videoId = $state('');
	let player: Player | null = null;
	let duration = $state(DEFAULT_DURATION);
	let currentTime = $state(0);
	let startTime = $state(15);
	let endTime = $state(30);
	let startInput = $state('0:15');
	let endInput = $state('0:30');
	let title = $state('');
	let author = $state('');
	let playing = $state(false);
	let previewing = $state(false);
	let loading = $state(false);
	let downloading = $state(false);
	let downloaded = $state(false);
	let error = $state('');
	let timer: ReturnType<typeof setInterval> | undefined;

	let clipDuration = $derived(Math.max(0, endTime - startTime));
	let startPercent = $derived((startTime / duration) * 100);
	let endPercent = $derived((endTime / duration) * 100);
	let playheadPercent = $derived((currentTime / duration) * 100);

	$effect(() => {
		return () => {
			if (timer) clearInterval(timer);
			player?.destroy();
		};
	});

	function parseVideoId(input: string) {
		try {
			const parsed = new URL(input.trim());
			if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1).split('/')[0];
			if (parsed.hostname.includes('youtube.com')) {
				if (parsed.pathname.startsWith('/shorts/')) return parsed.pathname.split('/')[2];
				if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/')[2];
				return parsed.searchParams.get('v') ?? '';
			}
		} catch {
			return /^[\w-]{11}$/.test(input.trim()) ? input.trim() : '';
		}
		return '';
	}

	async function loadIframeApi() {
		const youtubeWindow = window as YoutubeWindow;
		if (youtubeWindow.YT?.Player) return;
		await new Promise<void>((resolve) => {
			const previousReady = youtubeWindow.onYouTubeIframeAPIReady;
			youtubeWindow.onYouTubeIframeAPIReady = () => {
				previousReady?.();
				resolve();
			};
			if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
				const script = document.createElement('script');
				script.src = 'https://www.youtube.com/iframe_api';
				document.head.appendChild(script);
			}
		});
	}

	async function loadVideo(event?: SubmitEvent) {
		event?.preventDefault();
		const id = parseVideoId(url);
		if (!id) {
			error = 'Paste a valid YouTube link to continue.';
			return;
		}

		loading = true;
		error = '';
		downloaded = false;
		videoId = id;
		activeUrl = url.trim();
		currentTime = 0;
		startTime = 15;
		endTime = 30;
		startInput = formatTime(startTime);
		endInput = formatTime(endTime);
		player?.destroy();
		player = null;
		await tick();

		await loadIframeApi();
		player = new (window as YoutubeWindow).YT!.Player('youtube-player', {
			videoId: id,
			playerVars: { controls: 0, rel: 0, modestbranding: 1, playsinline: 1 },
			events: {
				onReady: ({ target }) => {
					duration = target.getDuration() || DEFAULT_DURATION;
					endTime = Math.min(30, duration);
					startTime = Math.min(15, Math.max(0, endTime - 1));
					startInput = formatTime(startTime);
					endInput = formatTime(endTime);
					const data = target.getVideoData();
					title = data.title || 'YouTube video';
					author = data.author || 'YouTube';
					loading = false;
					if (timer) clearInterval(timer);
					timer = setInterval(() => {
						if (!player) return;
						currentTime = player.getCurrentTime();
						playing = player.getPlayerState() === 1;
						if (previewing && playing && currentTime >= endTime) {
							previewing = false;
							player.pauseVideo();
							seek(endTime);
						}
					}, 200);
				},
				onStateChange: ({ data }) => (playing = data === 1),
				onError: () => {
					loading = false;
					error = 'This video cannot be played here. Try another link.';
				}
			}
		});
	}

	function togglePlayback() {
		if (!player) return;
		previewing = false;
		if (playing) player.pauseVideo();
		else player.playVideo();
	}

	function seek(seconds: number) {
		const next = Math.min(duration, Math.max(0, seconds));
		currentTime = next;
		player?.seekTo(next, true);
	}

	function setStart(value: number, syncInput = true) {
		previewing = false;
		startTime = Math.max(0, Math.min(value, Math.max(0, duration - 1)));
		if (startTime >= endTime) {
			endTime = Math.min(duration, startTime + 1);
			endInput = formatTime(endTime);
		}
		if (syncInput) startInput = formatTime(startTime);
		seek(startTime);
		downloaded = false;
	}

	function setEnd(value: number, syncInput = true) {
		previewing = false;
		endTime = Math.min(duration, Math.max(1, value));
		if (endTime <= startTime) {
			startTime = Math.max(0, endTime - 1);
			startInput = formatTime(startTime);
		}
		if (syncInput) endInput = formatTime(endTime);
		seek(endTime);
		downloaded = false;
	}

	function parseTime(value: string) {
		const match = value.trim().match(/^(\d+):([0-5]?\d)$/);
		if (!match) return null;
		return Number(match[1]) * 60 + Number(match[2]);
	}

	function updateTimeInput(field: 'start' | 'end', value: string) {
		if (field === 'start') startInput = value;
		else endInput = value;

		const seconds = parseTime(value);
		if (seconds === null) return;
		if (field === 'start') setStart(seconds, false);
		else setEnd(seconds, false);
	}

	function normalizeTimeInput(field: 'start' | 'end') {
		if (field === 'start') startInput = formatTime(startTime);
		else endInput = formatTime(endTime);
	}

	function handleTimelineClick(event: MouseEvent) {
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		seek(((event.clientX - rect.left) / rect.width) * duration);
	}

	function handleTimelineKeydown(event: KeyboardEvent) {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
		event.preventDefault();
		seek(currentTime + (event.key === 'ArrowRight' ? 5 : -5));
	}

	async function downloadClip() {
		if (!activeUrl || downloading) return;
		downloading = true;
		error = '';
		try {
			const response = await fetch('/youtube/clip', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ url: activeUrl, start: startTime, end: endTime })
			});
			if (!response.ok) {
				const result = await response.json().catch(() => ({}));
				throw new Error(result.message || 'Could not create the clip.');
			}
			const blob = await response.blob();
			const href = URL.createObjectURL(blob);
			const anchor = document.createElement('a');
			anchor.href = href;
			anchor.download = `${title || 'youtube-clip'}-${formatTime(startTime)}-${formatTime(endTime)}.mp3`
				.replaceAll(':', '-')
				.replace(/[^a-z0-9._-]+/gi, '-');
			anchor.click();
			URL.revokeObjectURL(href);
			downloaded = true;
		} catch (caught) {
			error = caught instanceof Error ? caught.message : 'Could not create the clip.';
		} finally {
			downloading = false;
		}
	}

	function formatTime(seconds: number) {
		const safe = Math.max(0, Math.round(seconds));
		const minutes = Math.floor(safe / 60);
		return `${minutes}:${String(safe % 60).padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>YouTube clip</title>
</svelte:head>

<div class="youtube-page">
	<main class="workspace">
		<section class="intro" aria-labelledby="page-title">
			<h1 id="page-title">YouTube clip</h1>
			<p class="lede">Paste a link, select a range, and download the audio.</p>

			<form class="url-form" onsubmit={loadVideo}>
				<div class:error class="url-field">
					<input bind:value={url} aria-label="YouTube URL" placeholder="YouTube URL" />
				</div>
				<button class="load-button" type="submit" disabled={loading}>
					{loading ? 'Loading…' : 'Load'}
				</button>
			</form>
			{#if error}<p class="error-message" role="alert">{error}</p>{/if}
		</section>

		{#if videoId}
			<section class="editor" aria-label="Clip editor">
				<div class="video-column">
					<div class="video-frame" class:is-loading={loading}>
						{#key videoId}<div id="youtube-player"></div>{/key}
						{#if loading}<span class="video-loader">Loading…</span>{/if}
					</div>
					<div class="video-details">
						<div><p>{title || 'Loading video…'}</p><span>{author}</span></div>
						<span class="duration">{formatTime(duration)}</span>
					</div>
				</div>

				<div class="clip-panel">
					<div class="panel-heading">
						<h2>Clip</h2>
						<p>Drag the range or enter seconds.</p>
					</div>

					<div class="time-fields">
						<label>
							<span>Start</span>
							<div><input type="text" inputmode="numeric" value={startInput} aria-label="Clip start time in minutes and seconds" oninput={(e) => updateTimeInput('start', e.currentTarget.value)} onblur={() => normalizeTimeInput('start')} /></div>
						</label>
						<span class="time-arrow">→</span>
						<label>
							<span>End</span>
							<div><input type="text" inputmode="numeric" value={endInput} aria-label="Clip end time in minutes and seconds" oninput={(e) => updateTimeInput('end', e.currentTarget.value)} onblur={() => normalizeTimeInput('end')} /></div>
						</label>
						<div class="clip-length"><span>Clip length</span><strong>{formatTime(clipDuration)}</strong></div>
					</div>

					<div class="timeline-wrap">
						<div class="timeline" onclick={handleTimelineClick} onkeydown={handleTimelineKeydown} role="slider" aria-label="Video timeline" aria-valuenow={currentTime} aria-valuemin="0" aria-valuemax={duration} tabindex="0">
							<div class="waveform" aria-hidden="true">
								{#each bars as height, index}<i class:active={index / bars.length >= startTime / duration && index / bars.length <= endTime / duration} style:height={`${height}%`}></i>{/each}
							</div>
							<div class="selection" style:left={`${startPercent}%`} style:width={`${endPercent - startPercent}%`}></div>
							<div class="playhead" style:left={`${playheadPercent}%`}></div>
						</div>
						<input class="range range-start" aria-label="Clip start" type="range" min="0" max={duration} step="1" value={startTime} oninput={(e) => setStart(Number(e.currentTarget.value))} />
						<input class="range range-end" aria-label="Clip end" type="range" min="0" max={duration} step="1" value={endTime} oninput={(e) => setEnd(Number(e.currentTarget.value))} />
						<div class="timeline-labels"><span>0:00</span><span>{formatTime(duration / 2)}</span><span>{formatTime(duration)}</span></div>
					</div>

					<div class="transport">
						<button class="play-button" onclick={togglePlayback}>{playing ? 'Pause' : 'Play'}</button>
						<button class="current-time" onclick={() => seek(startTime)}><span>{formatTime(currentTime)}</span> / {formatTime(duration)}</button>
						<button class="preview-button" onclick={() => { previewing = true; seek(startTime); player?.playVideo(); }}>Preview range</button>
					</div>

					<button class:complete={downloaded} class="download-button" onclick={downloadClip} disabled={downloading}>
						{#if downloading}Creating MP3…{:else if downloaded}Downloaded{:else}Download MP3 ({formatTime(clipDuration)}){/if}
					</button>
				</div>
			</section>
		{:else}
			<section class="empty-state">
				<p>Paste a link to start.</p>
			</section>
		{/if}
	</main>
</div>
