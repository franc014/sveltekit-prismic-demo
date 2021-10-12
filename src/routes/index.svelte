<script context="module">
	import Client from '$lib/prismic';
	import prismic from '@prismicio/client';

	console.log(Client);

	export async function load({ page, fetch, session, stuff }) {
		const response = await Client.query([prismic.Predicates.at('document.type', 'recipe')]);

		return {
			props: {
				recipes: response.results
			}
		};
	}
</script>

<script>
	export let recipes;
	$: console.log(recipes);
</script>

<div class="bg-green-100 h-64 flex flex-col justify-center">
	<h1 class="text-5xl mb-4">Veggie recipes</h1>
	<h2 class="text-3xl mb-4">All you need for your health</h2>
</div>
