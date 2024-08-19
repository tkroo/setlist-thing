<script>
	import { fade } from 'svelte/transition';
	// import { flip } from 'svelte/animate';
	import Song from '$lib/Song2.svelte';
	import Sorter from "$lib/Sorter.svelte";
	import { dndzone } from 'svelte-dnd-action';
  import { getTotalDuration } from '$lib/utils.js';
	import { songlist } from '$lib/stores.js';
	const flipDurationMs = 60;
	let items;

  let searchTerm = "";

	
  $: filtered = $songlist.filter((x) => x.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
	$: $songlist && (items = [...filtered]);
	
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>

<div class="heading">
  <input class="btn wide" type="search" name="search" bind:value={searchTerm} placeholder="search for a song">
  <input class="btn" type="reset" name="reset" value="X" alt="Clear the search vid" on:click={() => { searchTerm = ""}}>
  <div class="info">length: {getTotalDuration(filtered)} ({filtered.length} {filtered.length === 1 ? 'song' : 'songs'})</div>
</div>
<div class="info">double click to edit songs</div>

{#if items.length}
	<div class="nomnop" transition:fade={{ delay: 250, duration: 300 }}>
		<Sorter bind:arr={items} />
		<div class="innerlist" use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
			{#each items as item(item.id)}
				<Song on:move on:editsong on:dclick song={item} />
			{/each}
		</div>
	</div>
{/if}


<style>
  .wide {
    cursor: text;
    text-align: left;
    flex-basis: 100%;
    margin-right: 0.25rem;
  }
  .h2 {
    margin: 0 0 1rem 0;
    border-bottom: 1px solid #eee;
  }
  .info {
    display: inline-block;
    font-size: 0.75rem;
  }
</style>