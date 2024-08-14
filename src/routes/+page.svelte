<script>
  import VerticalList2 from '$lib/VerticalList2.svelte';
  import Controls from '$lib/Controls.svelte';
  import Song from '$lib/Song2.svelte';
  import Sorter from "$lib/Sorter.svelte";
  import Info from "$lib/Info.svelte";
  import { setlist, songlist } from '$lib/stores.js';
  import { onMount } from 'svelte';
  import { loadMainSongCSV, getTotalDuration, formatDuration } from '$lib/utils.js';  
  
  onMount(async () => {
    const msl = await loadMainSongCSV();
    $songlist = msl.data.map((x, index) => {
      let id = index;
      x.duration = formatDuration(x.duration)
      return {id, ...x}
    });
  });

  function move(event) {
    const s = event.detail.song;
    console.log('top level move() :',s);
    if ($setlist.find(x => x.id === s.id)) {
      $setlist = $setlist.filter(x => x.id !== s.id);
      return;
    } else {
      let song = $songlist.find(x => x.id === s.id);
      $setlist = [...$setlist, song];
    }
  }

  let searchTerm = "";
	$: filtered = $songlist.filter((x) => x.title.toLowerCase().includes(searchTerm.toLowerCase()));

</script>


<header>
  <h1>setlist thing</h1>
  <Controls />
  <Info />
</header>

<div class="cols">
  <div class="songlist">
    <form>
      <input class="btn wide" type="search" name="search" bind:value={searchTerm} placeholder="search for a song">
      <input class="btn" type="reset" name="reset" value="X" alt="Clear the search form" on:click={() => { searchTerm = ""}}>
    </form>
    <Sorter bind:arr={$songlist} />
    <div class="innerlist">
      {#each filtered as song}
        <Song on:move={move} song={song} />
      {/each}
    </div>
    
  </div>

  <div class="setlist">
  <p>
  {#if $setlist.length}
  set length: {getTotalDuration($setlist)} ({$setlist.length} {$setlist.length === 1 ? 'song' : 'songs'})
  {:else}
  click a song in the song list to start a set list
  {/if}
  </p>
    <VerticalList2 on:move={move} bind:items={$setlist} />
  </div>
</div>

<div id="SETLISTPRINT">
  <ol>
    {#each $setlist as song}
    <li>{song.title}</li>
    {/each}
  </ol>
</div>


<style>
  /* form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */
  .wide {
    cursor: text;
    text-align: left;
    flex-basis: 100%;
    margin-right: 0.25rem;
  }
</style>