<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
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
