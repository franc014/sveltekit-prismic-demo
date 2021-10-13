<script context="module">
	import Client from '$lib/prismic';
	export async function load({ page }) {
		const response = await Client.getByUID('recipe', page.params.slug);
		const recipe = await response;

		return {
			props: {
				recipe
			}
		};
	}
</script>

<script>
	export let recipe;
	const { data } = recipe;
	console.log(data);
</script>

{#if data}
	<article class="bg-orange-200 pt-20">
		<h1 class="text-5xl mb-12">{data.title[0].text}</h1>
		<div>{data.description[0].text}</div>
	</article>
{/if}
