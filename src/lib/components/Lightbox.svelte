<script lang="ts">
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import './lightbox.css';

	let {
		title,
		subtitle = '',
		description = '',
		image,
		imageAlt = '',
		onclose,
		children
	}: {
		title: string;
		subtitle?: string;
		description?: string;
		image: string;
		imageAlt?: string;
		onclose: () => void;
		children?: Snippet;
	} = $props();

	function lightboxIn(
		_node: Element,
		{ duration = 360, easing = expoOut }: { duration?: number; easing?: (t: number) => number } = {}
	) {
		return {
			duration,
			easing,
			css: (t: number) => {
				const y = (1 - t) * 16;
				const s = 0.98 + t * 0.02;
				return `opacity:${t}; transform: translate3d(0, ${y}px, 0) scale(${s});`;
			}
		};
	}

	function lightboxOut(
		_node: Element,
		{
			duration = 180,
			easing = cubicOut
		}: { duration?: number; easing?: (t: number) => number } = {}
	) {
		return {
			duration,
			easing,
			css: (t: number) => {
				const y = (1 - t) * 8;
				const s = 0.98 + t * 0.02;
				return `opacity:${t}; transform: translate3d(0, ${y}px, 0) scale(${s});`;
			}
		};
	}

	let zoom = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let panning = $state(false);
	let imageLoaded = $state(false);
	let imageFailed = $state(false);
	let panStartX = 0;
	let panStartY = 0;
	let panOriginX = 0;
	let panOriginY = 0;

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) onclose();
	}

	function bindImage(node: HTMLImageElement) {
		if (node.complete && node.naturalWidth > 0) imageLoaded = true;
	}

	function setZoomAt(nextZoom: number, originX: number, originY: number) {
		const clamped = Math.min(Math.max(nextZoom, 1), 4);
		if (clamped === zoom) return;

		if (clamped === 1) {
			zoom = 1;
			panX = 0;
			panY = 0;
			return;
		}

		const scale = clamped / zoom;
		panX = originX - (originX - panX) * scale;
		panY = originY - (originY - panY) * scale;
		zoom = clamped;
	}

	function handleImageWheel(event: WheelEvent) {
		event.preventDefault();
		const stage = event.currentTarget as HTMLElement;
		const rect = stage.getBoundingClientRect();
		const originX = event.clientX - rect.left - rect.width / 2;
		const originY = event.clientY - rect.top - rect.height / 2;
		setZoomAt(zoom + (event.deltaY < 0 ? 0.25 : -0.25), originX, originY);
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

	function toggleZoom(event: MouseEvent) {
		const stage = event.currentTarget as HTMLElement;
		const rect = stage.getBoundingClientRect();
		const originX = event.clientX - rect.left - rect.width / 2;
		const originY = event.clientY - rect.top - rect.height / 2;
		setZoomAt(zoom === 1 ? 2 : 1, originX, originY);
	}

	$effect(() => {
		const bodyOverflow = document.body.style.overflow;
		const htmlOverflow = document.documentElement.style.overflow;
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = bodyOverflow;
			document.documentElement.style.overflow = htmlOverflow;
		};
	});
</script>

<div
	class="lightbox"
	role="presentation"
	onclick={handleBackdropClick}
	in:fade={{ duration: 240 }}
	out:fade={{ duration: 170 }}
>
	<button
		type="button"
		class="lightbox-close"
		onclick={onclose}
		aria-label="Close"
		in:fade={{ duration: 200, delay: 80 }}
	>
		[x] close
	</button>

	<div
		class="lightbox-shell"
		role="dialog"
		aria-modal="true"
		aria-labelledby="lightbox-title"
		tabindex="-1"
		in:lightboxIn
		out:lightboxOut
	>
		<div
			class:zoomed={zoom > 1}
			class:panning
			class:is-loaded={imageLoaded || imageFailed}
			class="lightbox-image-stage"
			role="group"
			aria-label="Zoomable image. Scroll to zoom and drag to pan."
			aria-busy={!imageLoaded && !imageFailed}
			onwheel={handleImageWheel}
			onpointerdown={beginPan}
			onpointermove={panImage}
			onpointerup={endPan}
			onpointercancel={endPan}
			ondblclick={toggleZoom}
		>
			<span class="lightbox-skeleton" aria-hidden="true"></span>
			{#if imageFailed}
				<span class="missing-image">source image unavailable</span>
			{:else}
				<img
					src={image}
					alt={imageAlt || title}
					draggable="false"
					decoding="async"
					fetchpriority="high"
					onload={() => (imageLoaded = true)}
					onerror={() => (imageFailed = true)}
					use:bindImage
					style:transform={`translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`}
				/>
			{/if}
			<span class="lightbox-zoom-chip" class:is-visible={zoom > 1} aria-hidden="true">
				{zoom.toFixed(1)}×
			</span>
		</div>

		<div class="lightbox-meta">
			<p id="lightbox-title">{title}</p>
			{#if subtitle}
				<p class="lightbox-date">{subtitle}</p>
			{/if}
			{#if description}
				<p class="lightbox-description">{description}</p>
			{/if}
			{@render children?.()}
		</div>
	</div>
</div>
