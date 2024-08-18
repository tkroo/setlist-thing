<script>
	import { fade } from 'svelte/transition';
	// import { flip } from 'svelte/animate';
	import Song from '$lib/Song2.svelte';
	import Sorter from "$lib/Sorter.svelte";
	import { dndzone } from 'svelte-dnd-action';
  import { getTotalDuration } from '$lib/utils.js';
	import { setlist } from '$lib/stores.js';
	const flipDurationMs = 60;
	let items;

	$: $setlist && (items = [...$setlist]);
	
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>

<div class="heading">
	{#if items.length}
		set length: {getTotalDuration(items)} ({items.length} {items.length === 1 ? 'song' : 'songs'})
		<button class="btn" on:click={() => items=[]}>clear</button>
		<button class="btn" on:click={() => items=items.reverse()}>reverse</button>
	{:else}
		click a song in the song list to start a set list
	{/if}
</div>
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
