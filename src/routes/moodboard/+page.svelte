<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowUpRight } from 'lucide-svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import { lazyVisible } from '$lib/lazy-src';
	import { moodboardPrompts, moodboardUpdated, type MoodboardReference } from '$lib/moodboard';
	import './+page.css';

	let activePrompt = $state(moodboardPrompts[0]?.slug ?? 'all');
	let activeReference = $state<MoodboardReference | null>(null);
	let requestedImages = new SvelteSet<string>();
	let unavailableImages = new SvelteSet<string>();

	const visiblePrompts = $derived(
		activePrompt === 'all'
			? moodboardPrompts
			: moodboardPrompts.filter((prompt) => prompt.slug === activePrompt)
	);
	const referenceCount = moodboardPrompts.reduce(
		(total, prompt) => total + prompt.references.length,
		0
	);

	function openLightbox(reference: MoodboardReference) {
		activeReference = reference;
	}

	function closeLightbox() {
		activeReference = null;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && activeReference) closeLightbox();
	}
</script>

<svelte:head>
	<title>Moodboard | Aidan Neel</title>
	<meta name="description" content="A local working moodboard of visual references and prompts." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="buffer">
	<section aria-labelledby="moodboard-title">
		<div class="ln moodboard-nav">
			<a href={resolve('/')}>aidan-neel</a>
			<a href={resolve('/moodboard')} aria-current="page">moodboard</a>
		</div>
		<div class="ln"></div>
		<div class="ln comment"><h1 id="moodboard-title"># visual - moodboard</h1></div>
		<div class="ln comment">
			<p>{referenceCount} references · {moodboardPrompts.length} prompts · {moodboardUpdated}</p>
		</div>
		<div class="ln"></div>

		<nav class="prompt-filter" aria-label="Filter moodboard prompts">
			<button
				type="button"
				class:active={activePrompt === 'all'}
				aria-pressed={activePrompt === 'all'}
				onclick={() => (activePrompt = 'all')}>all</button
			>
			{#each moodboardPrompts as prompt (prompt.slug)}
				<button
					type="button"
					class:active={activePrompt === prompt.slug}
					aria-pressed={activePrompt === prompt.slug}
					onclick={() => (activePrompt = prompt.slug)}>{prompt.label.toLowerCase()}</button
				>
			{/each}
		</nav>

		<div class="prompt-list">
			{#each visiblePrompts as prompt (prompt.slug)}
				<section class="prompt-block" aria-labelledby={`${prompt.slug}-title`}>
					<div class="ln prompt-heading">
						<h2 id={`${prompt.slug}-title`}># {prompt.label.toLowerCase()}</h2>
						<p>{prompt.prompt}</p>
					</div>

					<div class="moodboard-grid">
						{#each prompt.references as reference (reference.image)}
							<button
								type="button"
								class="reference-tile"
								onclick={() => openLightbox(reference)}
								use:lazyVisible={() => requestedImages.add(reference.image)}
							>
								<span class="reference-thumb">
									{#if unavailableImages.has(reference.image)}
										<span class="missing-image">source image unavailable</span>
									{:else if requestedImages.has(reference.image)}
										<img
											src={reference.image}
											alt=""
											loading="lazy"
											decoding="async"
											fetchpriority="low"
											referrerpolicy="no-referrer"
											onerror={() => unavailableImages.add(reference.image)}
										/>
									{/if}
								</span>
								<span class="reference-caption">
									<span>{reference.title}</span>
									<span class="dim">{reference.creator}</span>
								</span>
							</button>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</section>

	<footer>
		<div class="ln comment"><p># curated locally, sourced properly</p></div>
		<div class="ln comment"><p># eof</p></div>
	</footer>
</div>

{#if activeReference}
	<Lightbox
		title={activeReference.title}
		subtitle={activeReference.creator}
		description={activeReference.note}
		image={activeReference.image}
		onclose={closeLightbox}
	>
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a class="song-link" href={activeReference.source} target="_blank" rel="noreferrer">
			<span class="song-text">
				<span class="song-title">view source</span>
				<span class="song-artist">{activeReference.creator}</span>
			</span>
			<ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
		</a>
	</Lightbox>
{/if}
