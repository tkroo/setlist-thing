<script>
	import { flip } from 'svelte/animate';
	import Song from '$lib/Song2.svelte';
	import { dndzone } from 'svelte-dnd-action';
  import { getTotalDuration, sortByKey } from '$lib/utils.js';
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

	export let items;
	const flipDurationMs = 300;
	
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	
	function handleDndFinalize(e) {
		items = e.detail.items;
	}

	let directionToggle = false;
	function sortMe(key) {
		directionToggle = !directionToggle;
		let tmp = sortByKey(items, key, directionToggle);
		items = tmp;
	}


  $: setDuration = getTotalDuration(items);

</script>

<header>
	<button on:click={() => sortMe('name')}>title</button>
	<button on:click={() => sortMe('length')}>length</button>
	<button on:click={() => sortMe('tuning')}>tuning</button>
</header>
<p>{items.length} songs {setDuration}</p>
<section use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
	{#each items as item(item.id)}
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
		min-height: 4rem;
		/* height: 70vh; */
	}
	div {
		/* width: 50%; */
		padding: 0.2em;
		/* border: 1px solid blue; */
		margin: 0.15em 0;
	}
	header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    width: 100%;
    padding: 0.5rem;
    border-bottom: 1px solid #000;
  }
</style>