<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { ArrowUpRight } from 'lucide-svelte';
	import ZoomText from '$lib/components/ZoomText.svelte';
	import './+page.css';

	const projects = [
		{
			title: 'Sivir UI',
			description: 'A reusable component library for SvelteKit.',
			status: 'Work in progress'
		},
		{
			title: 'Project ORION',
			description: 'Hackathon-winning radar web application.',
			status: 'Site offline'
		},
		{
			title: 'Killm',
			description: 'Disables mainstream LLM APIs and apps to reduce AI dependencies.',
			status: 'Project'
		}
	];

	const HERO_STEP = 0.04;
	const heroLine1 =
		'Committed to continuous learning in the ever evolving field of technology.'.split(' ');
	const heroLine2 = ''.split(' ');

	type Design = {
		title: string;
		description: string;
		date: string;
		image: string;
		songUrl?: string;
		audioFile?: string;
		audioStart?: number;
	};

	const CARD_IMAGE_SIZES =
		'(max-width: 850px) calc(100vw - 40px), (max-width: 1924px) calc((100vw - 124px) / 3), 600px';
	const cardImage = (image: string) => `/designs/${image}-480.webp`;
	const cardImageSet = (image: string) =>
		`/designs/${image}-480.webp 480w, /designs/${image}-960.webp 960w`;
	const fullImage = (image: string) => `/designs/${image}-full.webp`;

	// Add a songUrl to any design to show its View Song link.
	const designs: Design[] = [
		{
			title: 'Ungeneration',
			description:
				'"Unoriginal generation". I am not an anti-AI person, just thought it was an interesting concept.',
			date: '7/13/2026',
			image: 'ungeneration'
		},
		{
			title: 'Growing / Dying',
			description: 'Just enough to tell the forest from the fire',
			date: '7/12/2026',
			image: 'growing-dying',
			songUrl: 'https://open.spotify.com/track/5zMxLq47V3Gr0LlFvxiFXS?si=f9f50a57dcdf4540',
			audioFile: '/audio/growing-dying.mp3'
		},
		{
			title: 'Growing / Dying (alt)',
			description: 'Alternate version of the original design',
			date: '7/13/2026',
			image: 'growing-dying-alt',
			songUrl: 'https://open.spotify.com/track/5zMxLq47V3Gr0LlFvxiFXS?si=f9f50a57dcdf4540',
			audioFile: '/audio/growing-dying.mp3'
		},
		{
			title: 'All My Friends',
			description: 'And the next five years trying to be with your friends again!',
			date: '7/12/2026',
			image: 'all-my-friends',
			songUrl: 'https://open.spotify.com/track/2Ud3deeqLAG988pfW0Kwcl?si=1e574fa6d8484db8',
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
			title: 'Safe In Your Skin',
			description: 'Great song. I like the Tigers Jaw version more.',
			date: '7/11/2026',
			image: 'safe-in-your-skin',
			songUrl: 'https://open.spotify.com/track/09itu2ev1hcIzDBwgC6vjx?si=91bd6160191a49ba',
			audioFile: '/audio/safe-in-your-skin.mp3'
		},
		{
			title: 'Need',
			description:
				'Pinegrove is one of my favorite bands, and "Everything So Far" is one of my favorite albums. Need is my favorite song on the album.',
			date: '7/11/2026',
			image: 'need',
			songUrl: 'https://open.spotify.com/track/1AIyEFW7aET5gFB0tjRxP9?si=b1dee484ae464d5a',
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

	let activeDesign = $state<(typeof designs)[number] | null>(null);
	let zoom = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let panning = $state(false);
	let panStartX = 0;
	let panStartY = 0;
	let panOriginX = 0;
	let panOriginY = 0;
	let designAudio: HTMLAudioElement | null = null;
	let audioFade: ReturnType<typeof setInterval> | undefined;
	const DESIGN_AUDIO_VOLUME = 0.1;
	const DESIGN_AUDIO_DELAY = 120;
	const DESIGN_AUDIO_FADE_IN = 1500;

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

	$effect(() => () => fadeOutAudio());

	function openLightbox(design: (typeof designs)[number]) {
		zoom = 1;
		panX = 0;
		panY = 0;
		activeDesign = design;
		void playDesignAudio(design);
	}

	function closeLightbox() {
		activeDesign = null;
		fadeOutAudio();
	}

	function fadeAudio(audio: HTMLAudioElement, target: number, duration = 180) {
		if (audioFade) clearInterval(audioFade);
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
		fadeOutAudio();
		if (!design.audioFile) return;

		const audio = new Audio(design.audioFile);
		designAudio = audio;
		audio.loop = true;
		audio.volume = 0;
		audio.currentTime = design.audioStart ?? 0;
		try {
			await new Promise((resolve) => setTimeout(resolve, DESIGN_AUDIO_DELAY));
			if (designAudio !== audio) return;
			await audio.play();
			if (designAudio === audio) fadeAudio(audio, DESIGN_AUDIO_VOLUME, DESIGN_AUDIO_FADE_IN);
		} catch {
			if (designAudio === audio) designAudio = null;
		}
	}

	function fadeOutAudio() {
		const audio = designAudio;
		designAudio = null;
		if (!audio) return;
		fadeAudio(audio, 0);
		setTimeout(() => {
			audio.pause();
			audio.src = '';
		}, 190);
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
		if (event.key === 'Escape' && activeDesign) closeLightbox();
	}

	function handleLightboxClick(event: MouseEvent) {
		if (event.target === event.currentTarget) closeLightbox();
	}

	function reveal(node: HTMLElement) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					node.classList.add('in');
					observer.disconnect();
				}
			},
			{ threshold: 0.14 }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
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

<div class="portfolio">
	<section class="hero" aria-labelledby="intro-title">
		<header class="identity landing-enter" style="--d: 0.05s">
			<p class="name"><ZoomText text="Aidan Neel" /></p>
			<p class="role"><ZoomText text="Software Developer" /></p>
		</header>

		<div class="intro">
			<p class="eyebrow landing-enter" style="--d: 0.14s"><ZoomText text="[ABOUT ME]" /></p>
			<h1 id="intro-title">
				<span class="hero-line">
					{#each heroLine1 as word, index}
						{#if index > 0}{' '}{/if}<span class="reveal-mask-inline"
							><span class="reveal-line" style={`--d: ${0.14 + index * HERO_STEP}s`}
								><ZoomText text={word} /></span
							></span
						>
					{/each}
				</span>
				<span class="hero-line hero-line-muted">
					{#each heroLine2 as word, index}
						{#if index > 0}{' '}{/if}<span class="reveal-mask-inline"
							><span
								class="reveal-line"
								style={`--d: ${0.14 + (heroLine1.length + index) * HERO_STEP}s`}
								><ZoomText text={word} /></span
							></span
						>
					{/each}
				</span>
			</h1>
		</div>
	</section>

	<section class="archive-section" aria-labelledby="projects-title">
		<div class="section-heading landing-reveal" use:reveal>
			<p class="eyebrow"><ZoomText text="[SOFTWARE]" /></p>
			<h2 id="projects-title"><ZoomText text="Projects" /></h2>
		</div>

		<div class="archive-grid projects">
			{#each projects as project, index}
				<article
					class="project-entry landing-reveal"
					style={`--delay: ${index * 120}ms`}
					use:reveal
				>
					<h3><ZoomText text={project.title} /></h3>
					<p>{project.description}</p>
					<span class="project-status"><ZoomText text={project.status} /></span>
				</article>
			{/each}
		</div>
	</section>

	<section class="archive-section designs-section" aria-labelledby="designs-title">
		<div class="section-heading landing-reveal" use:reveal>
			<p class="eyebrow"><ZoomText text="[VISUAL]" /></p>
			<h2 id="designs-title"><ZoomText text="Designs" /></h2>
			<p class="section-description">
				<ZoomText
					text="A growing set of posters and experiments as I find my way back to designing. Typically inspired by music."
				/>
			</p>
		</div>

		<div class="archive-grid designs-grid">
			{#each designs as design, index}
				<article
					class="design-entry landing-reveal"
					style={`--delay: ${(index % 3) * 120}ms`}
					use:reveal
				>
					<button type="button" class="design-preview" onclick={() => openLightbox(design)}>
						<img
							src={cardImage(design.image)}
							srcset={cardImageSet(design.image)}
							sizes={CARD_IMAGE_SIZES}
							alt={`${design.title} design`}
							loading="lazy"
							decoding="async"
							fetchpriority="low"
						/>
						<span class="view-label"><ZoomText text="View" /></span>
					</button>
					<div class="design-meta">
						<h3><ZoomText text={design.title} /></h3>
						<p>{design.description}</p>
						<time><ZoomText text={design.date} /></time>
						{#if design.songUrl}
							<a class="song-link" href={design.songUrl} target="_blank" rel="noreferrer">
								<ZoomText text="View Song" />
								<ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>
</div>

{#if activeDesign}
	<div
		class="lightbox"
		role="presentation"
		onclick={handleLightboxClick}
		transition:fade={{ duration: 350, easing: cubicOut }}
	>
		<div
			class="lightbox-content"
			role="dialog"
			aria-modal="true"
			aria-labelledby="lightbox-title"
			tabindex="-1"
			transition:fly={{ y: 18, duration: 350, easing: cubicOut }}
		>
			<div
				class:zoomed={zoom > 1}
				class:panning
				class="lightbox-image-stage"
				role="group"
				aria-label="Zoomable image. Scroll to zoom and drag to pan."
				onwheel={handleImageWheel}
				onpointerdown={beginPan}
				onpointermove={panImage}
				onpointerup={endPan}
				onpointercancel={endPan}
				ondblclick={toggleZoom}
			>
				<img
					src={fullImage(activeDesign.image)}
					alt={`${activeDesign.title} design`}
					decoding="async"
					fetchpriority="high"
					style:transform={`translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`}
				/>
			</div>
			<div class="lightbox-caption">
				<p id="lightbox-title"><ZoomText text={activeDesign.title} /></p>
				<p>{activeDesign.description}</p>
			</div>
		</div>
	</div>
{/if}
