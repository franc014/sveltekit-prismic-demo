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
	const Elements = PrismicDom.RichText.Elements;
	export let recipe;
	const { data } = recipe;
	console.log(data);
	function htmlSerializer(type, element, content, children) {
		switch (type) {
			// Add a class to paragraph elements
			case Elements.paragraph:
				return '<p class="paragraph-class">' + children.join('') + '</p>';

			// Don't wrap images in a <p> tag
			case Elements.image:
				return '<img src="' + element.url + '" alt="' + element.alt + '">';

			// Add a class to hyperlinks
			case Elements.hyperlink:
				var target = element.data.target
					? 'target="' + element.data.target + '" rel="noopener"'
					: '';
				var linkUrl = PrismicDOM.Link.url(element.data, linkResolver);
				return '<a class="some-link"' + target + ' href="' + linkUrl + '">' + content + '</a>';

			// Return null to stick with the default behavior for all other elements
			default:
				return null;
		}
	}
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
			<div class="flex ">
				<img
					class="mt-4 mb-8 shadow-2xl "
					src={data.recipe_image.url}
					alt={data.recipe_image.alt}
					width={data.recipe_image.dimensions.width}
					height={data.recipe_image.dimensions.height}
				/>
			</div>
			<div class="grid">
				{#each data.body as slice}
					{#if slice.slice_type === 'ingredient_group'}
						<div>
							<h1 class="my-8 font-bold text-2xl">
								{PrismicDom.RichText.asText(slice.primary.ingredients_title)}
							</h1>
							<ul class="list-disc">
								{#each slice.items as ingredient}
									<li class="ml-6">
										{@html PrismicDom.RichText.asHtml(
											ingredient.ingredient_item,
											null,
											htmlSerializer
										)}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				{/each}
			</div>
			<div class="grid">
				{#each data.body as slice}
					{#if slice.slice_type === 'instructions'}
						<div>
							<h1 class="my-8 font-bold text-2xl">Instructions</h1>
							<ul class="list-disc">
								{#each slice.items as instruction}
									<li class="ml-6">
										{@html PrismicDom.RichText.asHtml(
											instruction.instruction_item,
											null,
											htmlSerializer
										)}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</article>
{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		@apply my-10;
	}
</style>
