<script>
  import VerticalList2 from '$lib/VerticalList2.svelte';
  import Controls from '$lib/Controls.svelte';
  import Song from '$lib/Song2.svelte';
  import Sorter from "$lib/Sorter.svelte";
  import Nav from '$lib/Nav.svelte';
  import { setlist, songlist } from '$lib/stores.js';
  import { onMount } from 'svelte';
  import { loadMainSongCSV, getTotalDuration } from '$lib/utils.js';  
  
  onMount(async () => {
    const msl = await loadMainSongCSV();
    $songlist = msl.data.map((x, index) => ({id:index+999, ...x}));
  });

  function move(event) {
    const s = event.detail.song;
    if ($setlist.find(x => x.name === s.name)) {
      $setlist = $setlist.filter(x => x.name !== s.name);
      return;
    } else {
      let song = $songlist.find(x => x.name === s.name);
      $setlist = [...$setlist, song];
    }
  }

  let searchTerm = "";
	$: filtered = $songlist.filter((x) => x.name.toLowerCase().includes(searchTerm.toLowerCase()));

</script>


<header>
  <h1>setlist thing</h1>
  <Controls />
  <Nav />
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
    <li>{song.name}</li>
    {/each}
  </ol>
</div>


<style>
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wide {
    cursor: text;
    text-align: left;
    flex-basis: 100%;
    margin-right: 0.25rem;
  }
</style>