<script lang="ts">
	import texture from '$lib/assets/textures/texture.png';

	const blurCopies = Array.from({ length: 28 }, (_, index) => index);
</script>

<svelte:head>
	<title>Do That Again — Test</title>
	<meta
		name="description"
		content="A layered type experiment using a CSS recreation of radial zoom blur."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="experiment" style:--texture={`url(${texture})`}>
	<p class="eyebrow">Layer study / 02</p>

	<div class="type-stack" aria-label="Do That Again">
		<!-- Layer 2: repeated, scaled copies imitate a Photoshop radial zoom blur. -->
		<div class="radial-blur" aria-hidden="true">
			{#each blurCopies as copy}
				<span style:--copy={copy}>Do That Again</span>
			{/each}
		</div>

		<!-- Layer 1: the sharp type stays above the blur. -->
		<p class="sharp-type">Do That Again</p>
	</div>

	<p class="caption">Radial blur / zoom</p>
</main>

<style>
	:global(body) {
		background: #fd1515;
	}

	.experiment {
		--text: #fff1ae;
		box-sizing: border-box;
		display: grid;
		grid-template-rows: auto 1fr auto;
		width: 100%;
		min-height: 100svh;
		padding: clamp(24px, 4vw, 60px);
		overflow: hidden;
		background: #fd1515;
		color: var(--text);
		isolation: isolate;
	}

	.experiment::after {
		position: fixed;
		z-index: 2;
		inset: 0;
		background-image: var(--texture);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		content: '';
		mix-blend-mode: multiply;
		opacity: 0.4;
		pointer-events: none;
	}

	.experiment > * {
		position: relative;
		z-index: 1;
	}

	.eyebrow,
	.caption {
		margin: 0;
		font-family: Arial, sans-serif;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.12em;
		line-height: 1;
		text-transform: uppercase;
	}

	.caption {
		justify-self: end;
	}

	.type-stack {
		position: relative;
		display: grid;
		place-items: center;
		align-self: center;
		justify-self: center;
		width: min(100%, 1180px);
		isolation: isolate;
	}

	.radial-blur,
	.sharp-type {
		grid-area: 1 / 1;
		margin: 0;
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(4.7rem, 13.4vw, 12.3rem);
		font-weight: 400;
		font-style: italic;
		letter-spacing: -0.065em;
		line-height: 0.8;
		white-space: nowrap;
	}

	.radial-blur {
		position: relative;
		z-index: 0;
		width: 100%;
		height: 1em;
		color: var(--text);
		filter: blur(0.75px);
		opacity: 0.65;
		mix-blend-mode: linear-light;
		pointer-events: none;
	}

	.radial-blur span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(calc(1 + (var(--copy) * 0.0013)));
		transform-origin: center;
		opacity: calc(0.16 - (var(--copy) * 0.007));
		will-change: transform, opacity;
	}

	.sharp-type {
		position: relative;
		z-index: 1;
		color: var(--text);
		text-wrap: balance;
	}

	@media (max-width: 620px) {
		.experiment {
			padding: 22px;
		}

		.radial-blur,
		.sharp-type {
			font-size: clamp(3.1rem, 15.25vw, 5.9rem);
			letter-spacing: -0.07em;
		}
	}
</style>
