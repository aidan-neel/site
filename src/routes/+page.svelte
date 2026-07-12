<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { ArrowUpRight } from 'lucide-svelte';
	import americanFootball from '$lib/assets/designs/americanfootball.png';
	import chateau from '$lib/assets/designs/chateau.png';
	import doThatAgain from '$lib/assets/designs/dothatagain.png';
	import eagles from '$lib/assets/designs/eagles.png';
	import figma from '$lib/assets/designs/figma.png';
	import marietta from '$lib/assets/designs/marietta.png';
	import openai from '$lib/assets/designs/openai.png';
	import reconstruction from '$lib/assets/designs/reconstruction.png';
	import t1 from '$lib/assets/designs/t1.png';
	import safeinyourskin from '$lib/assets/designs/safe-in-your-skin.png';
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
	};

	// Add a songUrl to any design to show its View Song link.
	const designs: Design[] = [
		{
			title: 'Do That Again',
			description: 'Big fan of Malcolm Todd and his new album "Do That Again."',
			date: '2026',
			image: doThatAgain
		},
		{
			title: 'Figma',
			description: 'Made a cool background, needed something to show off.',
			date: '2026',
			image: figma
		},
		{
			title: 'Safe In Your Skin',
			description: 'Great song. I like the Tigers Jaw version more.',
			date: '2026',
			image: safeinyourskin,
			songUrl: 'https://open.spotify.com/track/09itu2ev1hcIzDBwgC6vjx?si=91bd6160191a49ba'
		},
		{
			title: 'Marietta',
			description:
				'One of my favorite songs ever. Background is modified Starry Night. I am aware of the song name.',
			date: '2026',
			image: marietta,
			songUrl: 'https://open.spotify.com/track/2K4h2jMvqQ8VEKPP7F7MWg?si=e1a515f2485d4fd0'
		},
		{
			title: 'Eagles',
			description:
				'Wanted to mess around with this green color. It fit the Kelly Green Eagles well.',
			date: '2026',
			image: eagles
		},
		{
			title: 'Reconstruction Site',
			description:
				'Another song that is one of my favorites of all time. Really has that 2012 feel.',
			date: '2026',
			image: reconstruction,
			songUrl: 'https://open.spotify.com/track/29H6lyOfySXBLw5HAJpDFB?si=4ae97f7fef3b4cd1'
		},
		{
			title: 'American Football',
			description: 'Amazing band, amazing album. Background comes from a photo of a blue flower.',
			date: '2026',
			image: americanFootball
		},
		{ title: 'T1', description: 'Faker.', date: '2026', image: t1 },
		{
			title: 'OpenAI',
			description: 'Cool futuristic backgrounds, wanted a use for them.',
			date: '2026',
			image: openai
		},
		{ title: 'Chateau', description: 'Just like Rainbow Six.', date: '2026', image: chateau }
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

	function openLightbox(design: (typeof designs)[number]) {
		zoom = 1;
		panX = 0;
		panY = 0;
		activeDesign = design;
	}

	function closeLightbox() {
		activeDesign = null;
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
						<img src={design.image} alt={`${design.title} design`} />
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
					src={activeDesign.image}
					alt={`${activeDesign.title} design`}
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
