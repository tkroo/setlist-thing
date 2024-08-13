<script>
  import { createEventDispatcher } from "svelte";
	import { fade } from 'svelte/transition';
	// import { flip } from 'svelte/animate';
	import Song from '$lib/Song2.svelte';
	import Sorter from "$lib/Sorter.svelte";
	import { dndzone } from 'svelte-dnd-action';
  import { getTotalDuration } from '$lib/utils.js';
  const dispatch = createEventDispatcher();

	export let items;
	const flipDurationMs = 60;
	
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	
	function handleDndFinalize(e) {
		items = e.detail.items;
	}

  $: setDuration = getTotalDuration(items);

</script>

{#if items.length}
	<div transition:fade={{ delay: 250, duration: 300 }}>
		<span>{setDuration} total time</span>
		<span>({items.length} song{items.length === 1 ? '' : 's'})</span>	
		<button class="btn" on:click={() => items=[]}>clear list</button>
		<button class="btn" on:click={() => items=items.reverse()}>reverse list</button>
		<Sorter bind:arr={items} />
		<div class="innerlist" use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
			{#each items as item(item.id)}
				<!-- <div class="inner" animate:flip="{{duration: flipDurationMs}}"> -->
					<Song on:move={() => { dispatch('move', {song:item})}} song={item} />
				<!-- </div> -->
			{/each}
		</div>
	</div>
{/if}
