<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import { ArrowUpRight, Moon, Music, Sun, Volume2, VolumeX, X } from 'lucide-svelte';
	import { reveal } from '$lib/reveal';
	import './+page.css';

	const projects = [
		{
			title: 'Sivir UI',
			description: 'A reusable component library for SvelteKit.',
			status: 'Work in progress',
			tone: 'wip',
			url: 'https://sivir.dev'
		},
		{
			title: 'Project ORION',
			description: 'Hackathon-winning radar web application.',
			status: 'Site offline',
			tone: 'offline',
			url: 'https://orion.harville.dev/'
		},
		{
			title: 'Killm',
			description: 'Disables mainstream LLM APIs and apps to reduce AI dependencies.',
			status: 'Project',
			tone: 'active',
			url: 'https://github.com/aidan-neel/killm'
		}
	];

	const heroText = 'Committed to continuous learning in the ever evolving field of technology.';

	type Design = {
		title: string;
		description: string;
		date: string;
		image: string;
		songUrl?: string;
		songTitle?: string;
		artist?: string;
		audioFile?: string;
		audioStart?: number;
	};

	const CARD_IMAGE_SIZES =
		'(max-width: 700px) 50vw, (max-width: 1100px) 33vw, (max-width: 1500px) 25vw, 320px';
	const cardImage = (image: string) => `/designs/${image}-480.webp`;
	const cardImageSet = (image: string) =>
		`/designs/${image}-480.webp 480w, /designs/${image}-960.webp 960w`;
	const fullImage = (image: string) => `/designs/${image}-full.webp`;

	// Add song metadata and a songUrl to any design to show its song link.
	const designs: Design[] = [
		{
			title: 'Feeling',
			description: '',
			date: '7/21/2026',
			image: 'feeling',
			audioFile: '/audio/feeling.mp3'
		},
		{
			title: 'Lorem Ipsum',
			description: '',
			date: '7/20/2026',
			image: 'lorem-ipsum'
		},
		{
			title: 'Cup',
			description: '',
			date: '7/20/2026',
			image: 'cup'
		},
		{
			title: 'Dart',
			description: '',
			date: '7/20/2026',
			image: 'dart'
		},
		{
			title: 'Rivers and Roads',
			description: 'If you think about it, nothing really is as it has been.',
			date: '7/19/2026',
			image: 'rivers-and-roads',
			songTitle: 'Rivers and Roads',
			artist: 'The Head and the Heart',
			songUrl: 'https://open.spotify.com/track/5uXacxdjE3cNAzXmtO79o9',
			audioFile: '/audio/rivers-and-roads.mp3'
		},
		{
			title: 'Brains',
			description: 'Creepy. Hear the lyrics to understand.',
			date: '7/19/2026',
			image: 'brains',
			songTitle: 'Brains',
			artist: 'Marietta',
			songUrl: 'https://open.spotify.com/track/7DHaaPaOwQI8mXdNyd1Uq3?si=40d8d5b093a44202',
			audioFile: '/audio/brains.mp3'
		},
		{
			title: 'Down in the Valley',
			description: 'Another 10/10 album.',
			date: '7/19/2026',
			image: 'california',
			songTitle: 'Down in the Valley',
			artist: 'The Head and the Heart',
			songUrl: 'https://open.spotify.com/track/6soFQo67vXsBPU5hRVnYLt',
			audioFile: '/audio/california.mp3'
		},
		{
			title: 'The Outer Wilds',
			description: 'Inspired by the game "The Outer Wilds" and its soundtrack.',
			date: '7/19/2026',
			image: 'traveler',
			songTitle: 'Travelers',
			artist: 'Andrew Prahlow',
			songUrl: 'https://open.spotify.com/track/607Rub0edH75AmHEIsuw8N',
			audioFile: '/audio/travelers.mp3'
		},
		{
			title: 'VCR',
			description:
				'"Waiting to Spill" is one of my favorite albums of all time. Every song (besides Silhouette) is perfect.',
			date: '7/19/2026',
			image: 'vcr',
			songTitle: 'Morning in the Aves',
			artist: 'The Backseat Lovers',
			songUrl: 'https://open.spotify.com/track/6mWlah5Cxz8qTcW17pbj7h',
			audioFile: '/audio/vcr.mp3'
		},
		{
			title: 'Where Am I?',
			description: 'A different piece of the same song',
			date: '7/17/2026',
			image: 'where-am-i',
			songUrl: 'https://open.spotify.com/track/09itu2ev1hcIzDBwgC6vjx?si=91bd6160191a49ba',
			songTitle: 'Safe In Your Skin / Where Am I?',
			artist: 'Tigers Jaw',
			audioFile: '/audio/where-am-i.mp3'
		},
		{
			title: 'Slow It Down',
			description: 'Another Lumineers song.',
			date: '7/17/2026',
			image: 'slow-it-down',
			songUrl: 'https://open.spotify.com/track/5OFcjrC1OiRSBylQgF5HDD',
			songTitle: 'Slow It Down',
			artist: 'The Lumineers',
			audioFile: '/audio/slow-it-down.mp3'
		},
		{
			title: 'Chest Pain',
			description: 'Simple piece, was just testing out this new font.',
			date: '7/17/2026',
			image: 'chest-pain',
			songUrl: 'https://open.spotify.com/track/2XUx8PCXGpP1XhZJMGiUol',
			songTitle: 'Chest Pain (I Love)',
			artist: 'Malcolm Todd',
			audioFile: '/audio/chest-pain.mp3'
		},
		{
			title: "Joy's Got Somewhere to Be",
			description: 'Look at this little guy go!',
			date: '7/17/2026',
			image: 'little-joy'
		},

		{
			title: 'This Must Be the Place',
			description:
				'Great song. My mom used to play The Lumineers a ton when we lived in England. This one specifically is a cover of The Talking Heads.',
			date: '7/17/2026',
			image: 'this-must-be-the-place',
			songUrl: 'https://open.spotify.com/track/4tBYvaAQcdJhPnPLxD6QB7?si=5b9d3a0a99fa4ee0',
			songTitle: 'This Must Be the Place (Naive Melody)',
			artist: 'The Lumineers',
			audioFile: '/audio/this-must-be-the-place.mp3'
		},
		{
			title: 'The Way Back',
			description: 'The leaves might change but the roots stuck.',
			date: '7/16/2026',
			image: 'the-way-back',
			audioFile: '/audio/the-way-back.mp3',
			songTitle: 'The Way Back',
			artist: 'Zach Bryan',
			songUrl: 'https://open.spotify.com/track/6aPY5G8JEQJtgpaIMyElNX?si=3966782ed78f4f89'
		},
		{
			title: 'Never Meant',
			description:
				'One of the most iconic riffs of all time, and another one of my favorite songs of all time. I think everyone deserves to hear this riff atleast once in their life.',
			date: '7/14/2026',
			image: 'never-meant',
			audioFile: '/audio/never-meant.mp3',
			songTitle: 'Never Meant',
			artist: 'American Football',
			songUrl: 'https://open.spotify.com/track/6kZqCqD1r08sJAQ1TjuEpM?si=49ea30a0b80341d6'
		},
		{
			title: 'Heaven Go Easy on Me',
			description:
				'Beautiful song on one of my favorite albums of all time. I love the repeated lyrics at the end.',
			date: '7/14/2026',
			image: 'heaven',
			songUrl: 'https://open.spotify.com/track/22NnQwt4lNiky5m2l1u9EC?si=afbb01372677451c',
			songTitle: 'Heaven Go Easy on Me',
			artist: 'The Head and the Heart',
			audioFile: '/audio/heaven.mp3'
		},
		{
			title: 'Unexperience',
			description:
				'The inverse of "Ungeneration". From the perspective of the AI. The collage of photos represents human things.',
			date: '7/14/2026',
			image: 'experienced'
		},
		{
			title: 'California Stars',
			description:
				'Simple design, not really much to it. This album "Mermaid Avenue" has some great songs.',
			date: '7/14/2026',
			image: 'california-stars',
			songUrl: 'https://open.spotify.com/track/5B2mJIk8yso3ugyvfHR62A?si=45b26f44a4cf4a12',
			songTitle: 'California Stars',
			artist: 'Billy Bragg, Wilco',
			audioFile: '/audio/california-stars.mp3'
		},
		{
			title: 'Ungeneration',
			description:
				'"Unoriginal generation". I am not an anti-AI person, just thought it was an interesting concept.',
			date: '7/13/2026',
			image: 'ungeneration'
		},
		{
			title: 'Safe In Your Skin',
			description: 'Great song. I like the Tigers Jaw version more.',
			date: '7/11/2026',
			image: 'safe-in-your-skin',
			songUrl: 'https://open.spotify.com/track/09itu2ev1hcIzDBwgC6vjx?si=91bd6160191a49ba',
			songTitle: 'Safe In Your Skin / Where Am I?',
			artist: 'Tigers Jaw',
			audioFile: '/audio/safe-in-your-skin.mp3'
		},
		{
			title: 'Growing / Dying',
			description: 'Just enough to tell the forest from the fire',
			date: '7/12/2026',
			image: 'growing-dying',
			songUrl: 'https://open.spotify.com/track/5zMxLq47V3Gr0LlFvxiFXS?si=f9f50a57dcdf4540',
			songTitle: 'Growing / Dying',
			artist: 'The Backseat Lovers',
			audioFile: '/audio/growing-dying.mp3'
		},
		{
			title: 'Growing / Dying (alt)',
			description: 'Alternate version of the original design',
			date: '7/13/2026',
			image: 'growing-dying-alt',
			songUrl: 'https://open.spotify.com/track/5zMxLq47V3Gr0LlFvxiFXS?si=f9f50a57dcdf4540',
			songTitle: 'Growing / Dying',
			artist: 'The Backseat Lovers',
			audioFile: '/audio/growing-dying.mp3'
		},
		{
			title: 'All My Friends',
			description: 'And the next five years trying to be with your friends again!',
			date: '7/12/2026',
			image: 'all-my-friends',
			songUrl: 'https://open.spotify.com/track/2Ud3deeqLAG988pfW0Kwcl?si=1e574fa6d8484db8',
			songTitle: 'All My Friends',
			artist: 'LCD Soundsystem',
			audioFile: '/audio/all-my-friends.mp3'
		},
		{
			title: 'Do That Again',
			description: 'Big fan of Malcolm Todd and his new album "Do That Again."',
			date: '7/11/2026',
			image: 'dothatagain'
		},
		{
			title: 'Figma',
			description: 'Made a cool background, needed something to show off.',
			date: '7/11/2026',
			image: 'figma'
		},
		{
			title: 'Need',
			description:
				'Pinegrove is one of my favorite bands, and "Everything So Far" is one of my favorite albums. Need is my favorite song on the album.',
			date: '7/11/2026',
			image: 'need',
			songUrl: 'https://open.spotify.com/track/1AIyEFW7aET5gFB0tjRxP9?si=b1dee484ae464d5a',
			songTitle: 'Need',
			artist: 'Pinegrove',
			audioFile: '/audio/need.mp3'
		},
		{
			title: 'NASA',
			description: 'NASA!',
			date: '7/11/2026',
			image: 'nasa'
		},
		{
			title: 'Modern',
			description: 'Not much to it. Tried to keep it simpler.',
			date: '7/11/2026',
			image: 'modern'
		},
		/*
	{
			title: 'Marietta',
			description:
				'One of my favorite songs ever. Background is modified Starry Night. Unfortunate song name, but thats okay.',
			date: '7/11/2026',
			image: 'marietta',
			songUrl: 'https://open.spotify.com/track/2K4h2jMvqQ8VEKPP7F7MWg?si=e1a515f2485d4fd0',
			audioFile: '/audio/marietta.mp3',
			audioStart: 217
		},
		*/
		{
			title: 'Eagles',
			description:
				'Wanted to mess around with this green color. It fit the Kelly Green Eagles well.',
			date: '7/11/2026',
			image: 'eagles'
		},
		{
			title: 'Reconstruction Site',
			description:
				'Another song that is one of my favorites of all time. Really has that 2012 feel.',
			date: '7/11/2026',
			image: 'reconstruction',
			songUrl: 'https://open.spotify.com/track/29H6lyOfySXBLw5HAJpDFB?si=4ae97f7fef3b4cd1',
			songTitle: 'Reconstruction Site',
			artist: 'The Weakerthans',
			audioFile: '/audio/reconstruction-site.mp3',
			audioStart: 71
		},
		{
			title: 'American Football',
			description: 'Amazing band, amazing album. Background comes from a photo of a blue flower.',
			date: '7/11/2026',
			image: 'americanfootball'
		},
		{ title: 'T1', description: 'Faker.', date: '7/11/2026', image: 't1' },
		{
			title: 'OpenAI',
			description: 'Cool futuristic backgrounds, wanted a use for them.',
			date: '7/11/2026',
			image: 'openai'
		},
		{
			title: 'Chateau',
			description: 'Just like Rainbow Six.',
			date: '7/11/2026',
			image: 'chateau'
		}
	];

	const withSound = designs.filter((design) => design.audioFile).length;

	let activeDesign = $state<(typeof designs)[number] | null>(null);
	let zoom = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let panning = $state(false);
	let panStartX = 0;
	let panStartY = 0;
	let panOriginX = 0;
	let panOriginY = 0;
	let theme = $state<'light' | 'dark'>('light');
	let musicVolume = $state(20);
	let volumeOpen = $state(false);
	let loadedDesigns = $state(new Set<string>());
	let lightboxImageLoaded = $state(false);
	let songPlaying = $state(false);
	let heroNameEl = $state<HTMLElement | null>(null);
	let heroPassed = $state(false);
	let designAudio: HTMLAudioElement | null = null;
	let audioFade: ReturnType<typeof setInterval> | undefined;
	let audioPlaybackId = 0;
	const DESIGN_AUDIO_DELAY = 150;
	const DESIGN_AUDIO_FADE_IN = 1200;
	const DESIGN_AUDIO_FADE_OUT = 350;
	const musicMuted = $derived(musicVolume <= 0);
	const playbackVolume = $derived(Math.min(1, Math.max(0, musicVolume / 100)));

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

	function setMusicVolume(next: number) {
		const value = Math.min(100, Math.max(0, Math.round(next)));
		const wasMuted = musicVolume <= 0;
		const nextPlayback = value / 100;
		musicVolume = value;
		localStorage.setItem('music-volume', String(value));
		localStorage.removeItem('music-enabled');

		if (designAudio) {
			clearAudioFade();
			designAudio.volume = nextPlayback;
			if (value <= 0) {
				designAudio.pause();
				songPlaying = false;
			} else if (designAudio.paused && activeDesign?.audioFile) {
				void designAudio.play().then(
					() => (songPlaying = true),
					() => {}
				);
			}
		} else if (wasMuted && value > 0 && activeDesign?.audioFile) {
			void playDesignAudio(activeDesign);
		}
	}

	function toggleVolumeOpen() {
		volumeOpen = !volumeOpen;
	}

	onMount(() => {
		applyTheme(resolveTheme());
		const storedVolume = localStorage.getItem('music-volume');
		if (storedVolume !== null) {
			const parsed = Number(storedVolume);
			if (Number.isFinite(parsed)) musicVolume = Math.min(100, Math.max(0, parsed));
		} else if (localStorage.getItem('music-enabled') === '0') {
			musicVolume = 0;
		}

		const closeVolume = (event: PointerEvent) => {
			const target = event.target as Node | null;
			const root = document.querySelector('.opus-volume');
			if (root && target && !root.contains(target)) volumeOpen = false;
		};
		window.addEventListener('pointerdown', closeVolume);
		return () => window.removeEventListener('pointerdown', closeVolume);
	});

	// Swaps the masthead in once the display name has scrolled under the bar.
	$effect(() => {
		const node = heroNameEl;
		if (!node) return;
		const observer = new IntersectionObserver(([entry]) => (heroPassed = !entry.isIntersecting), {
			rootMargin: '-64px 0px 0px 0px',
			threshold: 0
		});
		observer.observe(node);
		return () => observer.disconnect();
	});

	$effect(() => {
		if (!activeDesign) return;

		const bodyOverflow = document.body.style.overflow;
		const htmlOverflow = document.documentElement.style.overflow;
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = bodyOverflow;
			document.documentElement.style.overflow = htmlOverflow;
		};
	});

	$effect(() => {
		// Music keeps playing through tab switches and alt-tabbing;
		// it only stops when the page is actually closed or navigated away from.
		const stopForPageExit = () => stopDesignAudio();
		window.addEventListener('pagehide', stopForPageExit);

		return () => {
			window.removeEventListener('pagehide', stopForPageExit);
			stopDesignAudio();
		};
	});

	function markDesignLoaded(image: string) {
		if (loadedDesigns.has(image)) return;
		loadedDesigns = new Set(loadedDesigns).add(image);
	}

	function bindDesignImage(node: HTMLImageElement, image: string) {
		const markIfReady = () => {
			if (node.complete && node.naturalWidth > 0) markDesignLoaded(image);
		};
		markIfReady();
		return {
			update(nextImage: string) {
				image = nextImage;
				markIfReady();
			}
		};
	}

	function openLightbox(design: (typeof designs)[number]) {
		zoom = 1;
		panX = 0;
		panY = 0;
		lightboxImageLoaded = false;
		activeDesign = design;
		void playDesignAudio(design);
	}

	function closeLightbox() {
		activeDesign = null;
		stopDesignAudio(true);
	}

	function fadeAudio(audio: HTMLAudioElement, target: number, duration = 180) {
		clearAudioFade();
		const from = audio.volume;
		const started = performance.now();
		audioFade = setInterval(() => {
			const progress = Math.min(1, (performance.now() - started) / duration);
			audio.volume = from + (target - from) * progress;
			if (progress === 1 && audioFade) {
				clearInterval(audioFade);
				audioFade = undefined;
			}
		}, 16);
	}

	async function playDesignAudio(design: (typeof designs)[number]) {
		stopDesignAudio();
		if (musicVolume <= 0 || !design.audioFile) return;

		const audio = new Audio(design.audioFile);
		const playbackId = audioPlaybackId;
		const targetVolume = playbackVolume;
		designAudio = audio;
		audio.loop = true;
		audio.volume = 0;
		audio.currentTime = design.audioStart ?? 0;
		try {
			await new Promise((resolve) => setTimeout(resolve, DESIGN_AUDIO_DELAY));
			if (playbackId !== audioPlaybackId || designAudio !== audio) {
				disposeAudio(audio);
				return;
			}
			await audio.play();
			if (playbackId !== audioPlaybackId || designAudio !== audio) {
				disposeAudio(audio);
				return;
			}
			songPlaying = true;
			fadeAudio(audio, targetVolume, DESIGN_AUDIO_FADE_IN);
		} catch {
			disposeAudio(audio);
		}
	}

	function disposeAudio(audio: HTMLAudioElement) {
		if (designAudio === audio) {
			designAudio = null;
		}
		songPlaying = false;
		audio.pause();
		audio.removeAttribute('src');
		audio.load();
	}

	function clearAudioFade() {
		if (!audioFade) return;
		clearInterval(audioFade);
		audioFade = undefined;
	}

	function stopDesignAudio(fadeOut = false) {
		audioPlaybackId += 1;
		clearAudioFade();

		const audio = designAudio;
		if (!audio) {
			songPlaying = false;
			return;
		}
		if (fadeOut && !audio.paused && audio.volume > 0) {
			fadeAudio(audio, 0, DESIGN_AUDIO_FADE_OUT);
			window.setTimeout(() => {
				if (designAudio === audio) {
					designAudio = null;
					disposeAudio(audio);
				}
			}, DESIGN_AUDIO_FADE_OUT);
			return;
		}
		designAudio = null;
		disposeAudio(audio);
	}

	function setZoom(nextZoom: number) {
		zoom = Math.min(Math.max(nextZoom, 1), 4);
		if (zoom === 1) {
			panX = 0;
			panY = 0;
		}
	}

	function handleImageWheel(event: WheelEvent) {
		event.preventDefault();
		setZoom(zoom + (event.deltaY < 0 ? 0.25 : -0.25));
	}

	function beginPan(event: PointerEvent) {
		if (zoom === 1) return;
		event.preventDefault();
		panning = true;
		panStartX = event.clientX;
		panStartY = event.clientY;
		panOriginX = panX;
		panOriginY = panY;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function panImage(event: PointerEvent) {
		if (!panning) return;
		panX = panOriginX + event.clientX - panStartX;
		panY = panOriginY + event.clientY - panStartY;
	}

	function endPan() {
		panning = false;
	}

	function toggleZoom() {
		setZoom(zoom === 1 ? 2 : 1);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (volumeOpen) {
				volumeOpen = false;
				return;
			}
			if (activeDesign) closeLightbox();
		}
	}

	function handleLightboxClick(event: MouseEvent) {
		if (event.target === event.currentTarget) closeLightbox();
	}
</script>

<svelte:head>
	<title>Aidan Neel</title>
	<meta
		name="description"
		content="Aidan Neel is a software developer and designer building thoughtful digital experiences."
	/>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="opus-home">
	<header class="opus-bar" class:is-stuck={heroPassed}>
		<div class="opus-bar-inner">
			<span class="opus-bar-name" aria-hidden={!heroPassed}>Aidan Neel</span>
			<div class="opus-bar-controls">
				<div class="opus-volume" class:is-open={volumeOpen}>
					<button
						type="button"
						class="opus-icon-btn opus-volume-toggle"
						onclick={toggleVolumeOpen}
						aria-label={volumeOpen ? 'Close volume' : 'Open volume'}
						aria-expanded={volumeOpen}
						aria-controls="opus-volume-slider"
					>
						{#if musicMuted}
							<VolumeX size={16} strokeWidth={1.75} aria-hidden="true" />
						{:else}
							<Volume2 size={16} strokeWidth={1.75} aria-hidden="true" />
						{/if}
					</button>
					<div class="opus-volume-shell">
						<input
							id="opus-volume-slider"
							class="opus-volume-slider"
							type="range"
							min="0"
							max="100"
							step="1"
							value={musicVolume}
							aria-label="Music volume"
							tabindex={volumeOpen ? 0 : -1}
							onpointerdown={(event) => event.stopPropagation()}
							oninput={(event) => setMusicVolume(Number(event.currentTarget.value))}
						/>
					</div>
				</div>
				<button
					type="button"
					class="opus-icon-btn opus-theme-toggle"
					onclick={toggleTheme}
					aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
				>
					<span class="opus-theme-icon" class:active={theme === 'dark'} aria-hidden="true">
						<Sun size={16} strokeWidth={1.75} />
					</span>
					<span class="opus-theme-icon" class:active={theme === 'light'} aria-hidden="true">
						<Moon size={16} strokeWidth={1.75} />
					</span>
				</button>
			</div>
		</div>
	</header>

	<div class="opus-shell">
		<section class="opus-hero" aria-labelledby="opus-intro-title">
			<h1 class="opus-display" bind:this={heroNameEl}>
				<span class="opus-mask"><span class="opus-mask-inner">Aidan Neel</span></span>
			</h1>
			<span class="opus-hero-rule" aria-hidden="true"></span>
			<div class="opus-hero-grid">
				<p class="opus-label" use:reveal={{ immediate: true, delay: 420, y: 6 }}>
					Software Developer
				</p>
				<p
					class="opus-statement"
					id="opus-intro-title"
					use:reveal={{ immediate: true, delay: 500 }}
				>
					{heroText}
				</p>
			</div>
		</section>

		<section class="opus-section" aria-labelledby="opus-projects-title">
			<div class="opus-rail">
				<p class="opus-label" use:reveal>Software</p>
				<div class="opus-rail-body">
					<h2 id="opus-projects-title" class="opus-heading" use:reveal={{ delay: 40 }}>Projects</h2>
					<div class="opus-projects">
						{#each projects as project, i (project.title)}
							<a
								class="opus-project"
								href={project.url}
								target="_blank"
								rel="noreferrer"
								use:reveal={{ delay: 80 + i * 70 }}
							>
								<span class="opus-project-top">
									<span class="opus-project-title">
										{project.title}
										<ArrowUpRight
											size={14}
											strokeWidth={1.75}
											class="opus-project-arrow"
											aria-hidden="true"
										/>
									</span>
									<span class="opus-status" data-tone={project.tone}>
										<span class="opus-status-dot" aria-hidden="true"></span>
										{project.status}
									</span>
								</span>
								<span class="opus-project-desc">{project.description}</span>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section class="opus-section" aria-labelledby="opus-designs-title">
			<div class="opus-rail">
				<p class="opus-label" use:reveal>Visual</p>
				<div class="opus-rail-body">
					<h2 id="opus-designs-title" class="opus-heading" use:reveal={{ delay: 40 }}>Designs</h2>
					<p class="opus-section-desc" use:reveal={{ delay: 90 }}>
						A growing set of posters and experiments as I find my way back to designing. Typically
						inspired by music.
					</p>
					<p class="opus-meta-line" use:reveal={{ delay: 140 }}>
						<span>{designs.length} pieces</span>
						<span class="opus-dot" aria-hidden="true"></span>
						<span>{withSound} play a song</span>
					</p>
				</div>
			</div>
		</section>
	</div>

	<section class="opus-wall" aria-label="Design archive">
		<div class="opus-moodboard">
			{#each designs as design, i (design.image)}
				<button
					type="button"
					class="opus-tile"
					class:is-loaded={loadedDesigns.has(design.image)}
					onclick={() => openLightbox(design)}
					aria-label={`View ${design.title}`}
					aria-busy={!loadedDesigns.has(design.image)}
					use:reveal={{ delay: (i % 5) * 50, y: 12 }}
				>
					<span class="opus-tile-skeleton" aria-hidden="true"></span>
					<img
						src={cardImage(design.image)}
						srcset={cardImageSet(design.image)}
						sizes={CARD_IMAGE_SIZES}
						alt=""
						loading="lazy"
						decoding="async"
						fetchpriority="low"
						onload={() => markDesignLoaded(design.image)}
						use:bindDesignImage={design.image}
					/>
					<span class="opus-tile-caption" aria-hidden="true">
						<span class="opus-tile-head">
							<span class="opus-tile-title">{design.title}</span>
							<span class="opus-tile-date">{design.date}</span>
						</span>
						{#if design.songTitle}
							<span class="opus-tile-song">
								<Music size={11} strokeWidth={2} aria-hidden="true" />
								{design.songTitle} — {design.artist}
							</span>
						{/if}
					</span>
				</button>
			{/each}
		</div>
	</section>

	{#if activeDesign}
		<div
			class="opus-lightbox"
			role="presentation"
			onclick={handleLightboxClick}
			in:fade={{ duration: 220 }}
			out:fade={{ duration: 160 }}
		>
			<button
				type="button"
				class="opus-close"
				onclick={closeLightbox}
				aria-label="Close"
				in:fade={{ duration: 200, delay: 120 }}
			>
				<X size={16} strokeWidth={1.75} aria-hidden="true" />
			</button>
			<div
				class="opus-sleeve"
				role="dialog"
				aria-modal="true"
				aria-labelledby="opus-lightbox-title"
				tabindex="-1"
				in:scale={{ start: 0.97, opacity: 0, duration: 380, easing: expoOut }}
				out:scale={{ start: 0.99, opacity: 0, duration: 160, easing: cubicOut }}
			>
				<div
					class:zoomed={zoom > 1}
					class:panning
					class:is-loaded={lightboxImageLoaded}
					class="opus-stage"
					role="group"
					aria-label="Zoomable image. Scroll to zoom and drag to pan."
					aria-busy={!lightboxImageLoaded}
					onwheel={handleImageWheel}
					onpointerdown={beginPan}
					onpointermove={panImage}
					onpointerup={endPan}
					onpointercancel={endPan}
					ondblclick={toggleZoom}
				>
					<span class="opus-stage-skeleton" aria-hidden="true"></span>
					<img
						src={fullImage(activeDesign.image)}
						alt={`${activeDesign.title} design`}
						draggable="false"
						decoding="async"
						fetchpriority="high"
						onload={() => (lightboxImageLoaded = true)}
						style:transform={`translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`}
					/>
					<span class="opus-zoom-chip" class:is-visible={zoom > 1} aria-hidden="true">
						{zoom.toFixed(1)}×
					</span>
				</div>

				<div class="opus-notes">
					<p class="opus-notes-date">{activeDesign.date}</p>
					<p id="opus-lightbox-title" class="opus-notes-title">{activeDesign.title}</p>
					{#if activeDesign.description}
						<p class="opus-notes-desc">{activeDesign.description}</p>
					{/if}
					{#if activeDesign.songTitle && activeDesign.artist}
						<span class="opus-notes-rule" aria-hidden="true"></span>
						{#if activeDesign.songUrl}
							<a class="opus-song" href={activeDesign.songUrl} target="_blank" rel="noreferrer">
								<span class="opus-song-glyph" aria-hidden="true">
									{#if songPlaying}
										<span class="opus-eq"><i></i><i></i><i></i></span>
									{:else}
										<Music size={12} strokeWidth={2} />
									{/if}
								</span>
								<span class="opus-song-text">
									<span class="opus-song-title">{activeDesign.songTitle}</span>
									<span class="opus-song-artist">{activeDesign.artist}</span>
								</span>
								<ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
							</a>
						{:else}
							<span class="opus-song is-static">
								<span class="opus-song-glyph" aria-hidden="true">
									{#if songPlaying}
										<span class="opus-eq"><i></i><i></i><i></i></span>
									{:else}
										<Music size={12} strokeWidth={2} />
									{/if}
								</span>
								<span class="opus-song-text">
									<span class="opus-song-title">{activeDesign.songTitle}</span>
									<span class="opus-song-artist">{activeDesign.artist}</span>
								</span>
							</span>
						{/if}
					{/if}
					<p class="opus-notes-hint">Scroll to zoom · Drag to pan · Esc to close</p>
				</div>
			</div>
		</div>
	{/if}
</div>
