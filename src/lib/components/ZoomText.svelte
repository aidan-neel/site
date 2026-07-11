<script lang="ts">
	let { text } = $props<{ text: string }>();
	const copies = Array.from({ length: 24 }, (_, index) => index);
</script>

<span class="zoom-text" aria-label={text}>
	<span class="zoom-text-blur" aria-hidden="true">
		{#each copies as copy}
			<span style:--copy={copy}>{text}</span>
		{/each}
	</span>
	<span class="zoom-text-sharp" aria-hidden="true">{text}</span>
</span>

<style>
	.zoom-text {
		position: relative;
		display: inline-grid;
		isolation: isolate;
		vertical-align: inherit;
	}

	.zoom-text-blur,
	.zoom-text-sharp {
		grid-area: 1 / 1;
		font: inherit;
		letter-spacing: inherit;
		line-height: inherit;
		white-space: pre-wrap;
	}

	.zoom-text-blur {
		position: relative;
		z-index: 0;
		color: inherit;
		filter: blur(0.7px);
		mix-blend-mode: linear-light;
		opacity: 0.75;
		pointer-events: none;
	}

	.zoom-text-blur span {
		position: absolute;
		top: 0;
		left: 0;
		transform: scale(calc(1 + (var(--copy) * 0.002)));
		transform-origin: center;
		opacity: calc(0.12 - (var(--copy) * 0.0048));
		will-change: transform, opacity;
	}

	.zoom-text-sharp {
		position: relative;
		z-index: 1;
	}
</style>
