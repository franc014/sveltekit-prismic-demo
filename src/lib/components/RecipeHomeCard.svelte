<script>
	export let recipe;
	const { data } = recipe;
</script>

<div class="bg-gray-200 rounded shadow p-6">
	<p class="mb-8 font-bold text-2xl">{data.title[0].text}</p>
	<p class="mb-8 ">{data.description[0].text}</p>
	<a href={`/${recipe.uid}`}>Read</a>
</div>
