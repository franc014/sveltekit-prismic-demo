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
	import PrismicDom from 'prismic-dom';
	export let recipe;
	const { data } = recipe;
	console.log(data);
</script>

{#if data}
	<article class="bg-orange-200 pt-20 ">
		<h1 class="text-5xl mb-12">{PrismicDom.RichText.asText(data.title)}</h1>
		<div class="divide-y-2 divide-yellow-600 divide-solid ">
			<div class="my-4">{PrismicDom.RichText.asText(data.description)}</div>
			<div class="py-4 ">
				Prep time: <span class="mr-2">{PrismicDom.RichText.asText(data.time)} 😋 </span>
				Cook time: <span class="mr-2">{PrismicDom.RichText.asText(data.cook_time)} 😋</span>
				Portions: <span>{data.yield}</span>
			</div>
			<img
				class="my-4 shadow-2xl "
				src={data.recipe_image.url}
				alt={data.recipe_image.alt}
				width={data.recipe_image.dimensions.width}
				height={data.recipe_image.dimensions.height}
			/>
		</div>
	</article>
{/if}
