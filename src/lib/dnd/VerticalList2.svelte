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

<div>
	<span>{setDuration} total time</span>
	{#if items.length}
	<span>({items.length} song{items.length === 1 ? '' : 's'})</span>
	{/if}
</div>
<header>
	<button on:click={() => sortMe('name')}>title</button>
	<button on:click={() => sortMe('length')}>length</button>
	<button on:click={() => sortMe('tuning')}>tuning</button>
</header>
<section use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
	{#each items as item(item.id)}
		<div animate:flip="{{duration: flipDurationMs}}">
			<Song on:move={() => { dispatch('move', {song:item})}} song={{id:item.id, name:item.name, tuning:item.tuning, length: item.length}} />
		</div>
	{/each}
</section>

<style>
	section {
		padding: 0.3em;
		border: 1px solid black;
		overflow: scroll;
		min-height: 4rem;
	}
	div {
		padding: 0.2em;
		margin: 0.15em 0;
	}
	header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    width: 100%;
    padding: 0.5rem 0;
  }
</style>