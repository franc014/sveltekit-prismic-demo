<script context="module">
	import Client from '$lib/prismic';
	import prismic from '@prismicio/client';

	export async function load() {
		const response = await Client.query([prismic.Predicates.at('document.type', 'recipe')]);

		return {
			props: {
				recipes: response.results
			}
		};
	}
</script>

<script>
	import RecipeCard from '$lib/components/RecipeHomeCard.svelte';

	export let recipes;
	$: console.log(recipes);
</script>

<section class="bg-green-100 h-64 flex flex-col justify-center mb-20">
	<h1 class="text-5xl mb-4">Veggie recipes</h1>
	<h2 class="text-3xl mb-4">All you need for your health</h2>
</section>

<main class="">
	<h1 class="text-3xl mb-16 font-bold">Week recipes</h1>
	<div class="posts">
		{#each recipes as recipe}
			<RecipeCard {recipe} />
		{/each}
	</div>
</main>

<style>
	.posts {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	}
</style>
