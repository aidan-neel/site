<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import { initChromaticAberration } from '$lib/chromatic-aberration';

	let { children } = $props();

	onMount(() => initChromaticAberration());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script>
		(function () {
			try {
				var stored = localStorage.getItem('theme');
				if (stored === 'light' || stored === 'dark') {
					document.documentElement.setAttribute('data-theme', stored);
				}
			} catch (_) {}
		})();
	</script>
</svelte:head>
<main>
	{@render children()}
</main>
