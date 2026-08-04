<script lang="ts">
	import { resolve } from '$app/paths';
	import './+page.css';

	const projects = [
		{
			title: 'Sivir UI',
			description: 'A reusable component library for SvelteKit.',
			url: 'https://sivir.dev'
		},
		{
			title: 'Project ORION',
			description: 'Hackathon-winning radar web application.',
			url: 'https://orion.harville.dev/'
		},
		{
			title: 'Killm',
			description: 'Disables mainstream LLM APIs and apps to reduce AI dependencies.',
			url: 'https://github.com/aidan-neel/killm'
		}
	];

	const lineNumbers = Array.from({ length: 300 }, (_, index) => index + 1);
</script>

<svelte:head>
	<title>Aidan Neel</title>
	<meta
		name="description"
		content="Aidan Neel is a software developer and designer building thoughtful digital experiences."
	/>
</svelte:head>

<div class="page-shell">
	<aside class="line-rail" aria-hidden="true">
		{#each lineNumbers as line (line)}
			<span>{line}</span>
		{/each}
	</aside>

	<header class="site-header" aria-label="Primary navigation">
		<div class="code-line"><a href={resolve('/')} aria-current="page">aidan-neel</a></div>
		<a class="nav-designs" href={resolve('/designs')}>designs</a>
	</header>

	<main class="code-content">
		<div class="code-line spacer" aria-hidden="true"></div>
		<section class="intro" aria-labelledby="page-title">
			<div class="code-line"><h1 id="page-title">Aidan Neel</h1></div>
			<div class="code-line muted"><p>Software Developer</p></div>
			<div class="code-line spacer" aria-hidden="true"></div>
			<div class="code-line">
				<p>Committed to continuous learning in the ever-evolving field of technology.</p>
			</div>
		</section>

		<section class="projects" aria-labelledby="projects-title">
			<div class="code-line spacer" aria-hidden="true"></div>
			<div class="code-line comment"><h2 id="projects-title"># software - projects</h2></div>
			<div class="code-line spacer" aria-hidden="true"></div>
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			{#each projects as project, index (project.title)}
				<a
					class="code-line project"
					href={project.url}
					target="_blank"
					rel="noreferrer"
					style={`--enter-delay: ${360 + index * 70}ms`}
				>
					<span>{project.title}</span>
					<span class="muted">{project.description}</span>
				</a>
			{/each}
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		</section>

		<div class="code-line spacer" aria-hidden="true"></div>
		<a class="code-line project designs-action" href={resolve('/designs')}
			><span>See my designs</span></a
		>
		<div class="code-line comment designs-comment"># they're really cool!</div>
	</main>

	<footer>
		<div class="code-line comment"># aidan neel - {new Date().getFullYear()}</div>
		<div class="code-line comment"># eof</div>
	</footer>
</div>
