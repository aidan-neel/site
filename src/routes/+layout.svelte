<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>aidan-neel</title>
</svelte:head>

<main class="w-screen h-screen fixed text-white flex items-start justify-center bg-neutral-900">
	<div class="w-full md:w-2/3 lg:w-1/3 xl:w-1/2 2xl:w-1/4 h-screen py-16 px-8">
		{@render children()}
	</div>
</main>
