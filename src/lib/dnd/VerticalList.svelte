<script>
	import { flip } from 'svelte/animate';
	import Song from '$lib/Song2.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

	export let items;

	let searchTerm = "";

	$: filtered = items.filter((x) => x.name.toLowerCase().includes(searchTerm.toLowerCase()));


	const flipDurationMs = 300;
	
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>
<p>{filtered.length} songs</p>
<input type="text" bind:value={searchTerm} placeholder="search...">
<section use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
	{#each filtered as item(item.id)}
		<!-- <div animate:flip="{{duration: flipDurationMs}}">
			{item.name}	
		</div> -->
		<div animate:flip="{{duration: flipDurationMs}}">
			<Song on:move={() => { dispatch('move', {song:item})}} song={{id:item.id, name:item.name, tuning:item.tuning, length: item.length}} />
		</div>
	{/each}
</section>

<style>
	section {
		/* min-width: 100%; */
		padding: 0.3em;
		border: 1px solid black;
		overflow: scroll;
		min-height: 2rem;
		height: 70vh;
	}
	div {
		/* width: 50%; */
		padding: 0.2em;
		/* border: 1px solid blue; */
		margin: 0.15em 0;
	}
</style>