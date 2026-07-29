<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { resolve } from '$app/paths';
	import { fade, fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import {
		ArrowLeft,
		Check,
		Clapperboard,
		Download,
		Film,
		Link2,
		Loader2,
		Moon,
		Music,
		Pause,
		Play,
		Sun
	} from 'lucide-svelte';
	import { reveal } from '$lib/reveal';
	import './+page.css';

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
	const bars = Array.from({ length: 128 }, (_, index) => {
		const wave = Math.abs(Math.sin(index * 1.73) * 0.55 + Math.sin(index * 0.47) * 0.28);
		return Math.round(18 + wave * 68);
	});

	const steps = [
		{ title: 'Paste a link', detail: 'Any youtube.com or youtu.be address, Shorts included.' },
		{
			title: 'Trim the range',
			detail: 'Drag the handles on the timeline or type exact timestamps.'
		},
		{ title: 'Take the clip', detail: 'Download it as MP3 audio or MP4 video.' }
	];

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
	let format = $state<'mp3' | 'mp4'>('mp3');
	let theme = $state<'light' | 'dark'>('light');
	let timer: ReturnType<typeof setInterval> | undefined;

	let clipDuration = $derived(Math.max(0, endTime - startTime));
	let startPercent = $derived((startTime / duration) * 100);
	let endPercent = $derived((endTime / duration) * 100);
	let playheadPercent = $derived((currentTime / duration) * 100);

	onMount(() => {
		applyTheme(resolveTheme());
	});

	$effect(() => {
		return () => {
			if (timer) clearInterval(timer);
			player?.destroy();
		};
	});

	function resolveTheme(): 'light' | 'dark' {
		const stored = localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark') return stored;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(next: 'light' | 'dark') {
		theme = next;
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem('theme', next);
	}

	function toggleTheme() {
		document.documentElement.classList.add('theme-animated');
		applyTheme(theme === 'dark' ? 'light' : 'dark');
	}

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

	function setFormat(next: 'mp3' | 'mp4') {
		format = next;
		downloaded = false;
	}

	async function downloadClip() {
		if (!activeUrl || downloading) return;
		downloading = true;
		error = '';
		try {
			const response = await fetch('/youtube/clip', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ url: activeUrl, start: startTime, end: endTime, format })
			});
			if (!response.ok) {
				const result = await response.json().catch(() => ({}));
				throw new Error(result.message || 'Could not create the clip.');
			}
			const blob = await response.blob();
			const href = URL.createObjectURL(blob);
			const anchor = document.createElement('a');
			anchor.href = href;
			anchor.download =
				`${title || 'youtube-clip'}-${formatTime(startTime)}-${formatTime(endTime)}.${format}`
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
	<title>YouTube Clipper</title>
	<meta
		name="description"
		content="Trim any YouTube video and download the clip as MP3 audio or MP4 video."
	/>
</svelte:head>

<div class="oy" class:is-loaded={!!videoId}>
	<header class="oy-bar">
		<div class="oy-bar-inner">
			<a class="oy-back" href={resolve('/')}>
				<ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" />
				Home
			</a>
			<span class="oy-wordmark">Clipper</span>
			<button
				type="button"
				class="oy-icon-btn"
				onclick={toggleTheme}
				aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				<span class="oy-theme-icon" class:active={theme === 'dark'} aria-hidden="true">
					<Sun size={16} strokeWidth={1.75} />
				</span>
				<span class="oy-theme-icon" class:active={theme === 'light'} aria-hidden="true">
					<Moon size={16} strokeWidth={1.75} />
				</span>
			</button>
		</div>
	</header>

	<div class="oy-shell">
		<section class="oy-hero" aria-labelledby="oy-title">
			<div class="oy-intro">
				<div class="oy-intro-inner">
					<h1 id="oy-title" use:reveal={{ immediate: true, delay: 60 }}>YouTube Clipper</h1>
					<p class="oy-lede" use:reveal={{ immediate: true, delay: 140 }}>
						Paste a link, trim the part you want, and download it as audio or video.
					</p>
				</div>
			</div>

			<form class="oy-form" onsubmit={loadVideo} use:reveal={{ immediate: true, delay: 220 }}>
				<div class:has-error={error} class="oy-field">
					<Link2 size={15} strokeWidth={1.75} class="oy-field-icon" aria-hidden="true" />
					<input
						bind:value={url}
						aria-label="YouTube URL"
						placeholder="Paste a YouTube link"
						autocapitalize="off"
						autocorrect="off"
						spellcheck="false"
						enterkeyhint="go"
					/>
				</div>
				<button class="oy-submit" type="submit" disabled={loading}>
					{#if loading}
						<Loader2 size={15} strokeWidth={1.75} class="oy-spin" aria-hidden="true" />
						Loading
					{:else}
						Load video
					{/if}
				</button>
			</form>

			{#if error}
				<p class="oy-error" role="alert" in:fly={{ y: -4, duration: 220, easing: expoOut }}>
					{error}
				</p>
			{/if}
		</section>

		{#if videoId}
			<section class="oy-workbench" aria-label="Clip editor">
				<div class="oy-stage" use:reveal={{ immediate: true }}>
					<div class="oy-video" class:is-loading={loading}>
						{#key videoId}<div id="youtube-player"></div>{/key}
						{#if loading}
							<div class="oy-video-loader" out:fade={{ duration: 200 }}>
								<span>Loading video…</span>
							</div>
						{/if}
					</div>

					<div class="oy-timeline-wrap">
						<div
							class="oy-timeline"
							onclick={handleTimelineClick}
							onkeydown={handleTimelineKeydown}
							role="slider"
							aria-label="Video timeline"
							aria-valuenow={currentTime}
							aria-valuemin="0"
							aria-valuemax={duration}
							tabindex="0"
						>
							<div class="oy-wave" aria-hidden="true">
								{#each bars as height, index (index)}<i
										class:active={index / bars.length >= startTime / duration &&
											index / bars.length <= endTime / duration}
										style:height={`${height}%`}
									></i>{/each}
							</div>
							<div
								class="oy-selection"
								style:left={`${startPercent}%`}
								style:width={`${endPercent - startPercent}%`}
							></div>
							<div class="oy-playhead" style:left={`${playheadPercent}%`}></div>
						</div>

						<input
							class="oy-range oy-range-start"
							aria-label="Clip start"
							type="range"
							min="0"
							max={duration}
							step="1"
							value={startTime}
							oninput={(e) => setStart(Number(e.currentTarget.value))}
						/>
						<input
							class="oy-range oy-range-end"
							aria-label="Clip end"
							type="range"
							min="0"
							max={duration}
							step="1"
							value={endTime}
							oninput={(e) => setEnd(Number(e.currentTarget.value))}
						/>

						<span
							class="oy-handle oy-handle-start"
							style:left={`${startPercent}%`}
							aria-hidden="true"
						></span>
						<span class="oy-handle oy-handle-end" style:left={`${endPercent}%`} aria-hidden="true"
						></span>

						<div class="oy-ticks">
							<span>0:00</span>
							<span>{formatTime(duration / 2)}</span>
							<span>{formatTime(duration)}</span>
						</div>
					</div>

					<div class="oy-transport">
						<button
							class="oy-play"
							onclick={togglePlayback}
							aria-label={playing ? 'Pause' : 'Play'}
						>
							{#if playing}
								<Pause size={15} strokeWidth={1.75} aria-hidden="true" />
							{:else}
								<Play size={15} strokeWidth={1.75} class="oy-play-icon" aria-hidden="true" />
							{/if}
						</button>
						<button class="oy-pill oy-clock" onclick={() => seek(startTime)}>
							<span>{formatTime(currentTime)}</span>
							<span class="oy-clock-total">/ {formatTime(duration)}</span>
						</button>
						<button
							class="oy-pill"
							onclick={() => {
								previewing = true;
								seek(startTime);
								player?.playVideo();
							}}
						>
							Preview range
						</button>
					</div>
				</div>

				<aside class="oy-export" use:reveal={{ immediate: true, delay: 100 }}>
					<div class="oy-export-head">
						<p class="oy-export-title">{title || 'Loading video…'}</p>
						<p class="oy-export-sub">
							{author}{#if author}<span class="oy-sep" aria-hidden="true"></span>{/if}{formatTime(
								duration
							)}
						</p>
					</div>

					<div class="oy-rows">
						<label class="oy-row">
							<span>Start</span>
							<span class="oy-input">
								<input
									type="text"
									inputmode="numeric"
									value={startInput}
									aria-label="Clip start time in minutes and seconds"
									oninput={(e) => updateTimeInput('start', e.currentTarget.value)}
									onblur={() => normalizeTimeInput('start')}
								/>
							</span>
						</label>
						<label class="oy-row">
							<span>End</span>
							<span class="oy-input">
								<input
									type="text"
									inputmode="numeric"
									value={endInput}
									aria-label="Clip end time in minutes and seconds"
									oninput={(e) => updateTimeInput('end', e.currentTarget.value)}
									onblur={() => normalizeTimeInput('end')}
								/>
							</span>
						</label>
					</div>

					<div class="oy-length">
						<span>Clip length</span>
						<strong>{formatTime(clipDuration)}</strong>
					</div>

					<div class="oy-format" role="radiogroup" aria-label="Download format">
						<span class="oy-format-thumb" class:right={format === 'mp4'} aria-hidden="true"></span>
						<button
							type="button"
							role="radio"
							aria-checked={format === 'mp3'}
							class:active={format === 'mp3'}
							onclick={() => setFormat('mp3')}
						>
							<Music size={13} strokeWidth={1.75} aria-hidden="true" />
							MP3
						</button>
						<button
							type="button"
							role="radio"
							aria-checked={format === 'mp4'}
							class:active={format === 'mp4'}
							onclick={() => setFormat('mp4')}
						>
							<Film size={13} strokeWidth={1.75} aria-hidden="true" />
							MP4
						</button>
					</div>

					<button
						class:complete={downloaded}
						class="oy-download"
						onclick={downloadClip}
						disabled={downloading}
					>
						{#if downloading}
							<Loader2 size={16} strokeWidth={1.75} class="oy-spin" aria-hidden="true" />
							Creating {format.toUpperCase()}…
						{:else if downloaded}
							<Check size={16} strokeWidth={1.75} aria-hidden="true" />
							Downloaded
						{:else}
							<Download size={16} strokeWidth={1.75} aria-hidden="true" />
							Download {format.toUpperCase()} · {formatTime(clipDuration)}
						{/if}
					</button>
					<p class="oy-limits">MP3 up to 10 minutes · MP4 up to 5 minutes</p>
				</aside>
			</section>
		{:else}
			<section class="oy-empty" aria-label="How it works">
				<p class="oy-empty-label" use:reveal={{ immediate: true, delay: 300 }}>
					<Clapperboard size={14} strokeWidth={1.75} aria-hidden="true" />
					How it works
				</p>
				<ol class="oy-steps">
					{#each steps as step, i (step.title)}
						<li use:reveal={{ immediate: true, delay: 360 + i * 70 }}>
							<span class="oy-step-num">{String(i + 1).padStart(2, '0')}</span>
							<span class="oy-step-body">
								<strong>{step.title}</strong>
								<span>{step.detail}</span>
							</span>
						</li>
					{/each}
				</ol>
			</section>
		{/if}
	</div>
</div>
