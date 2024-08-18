<script>
  let foo;
  import VerticalList2 from '$lib/VerticalList2.svelte';
  import { fade } from 'svelte/transition';
  import Controls from '$lib/Controls.svelte';
  import Song from '$lib/Song2.svelte';
  import Sorter from "$lib/Sorter.svelte";
  import Info from "$lib/Info.svelte";
  import EditSong from "$lib/EditSong.svelte";
  import { setlist, songlist, ctrlPressed } from '$lib/stores.js';
  import { onMount } from 'svelte';
  import { loadMainSongCSV, getTotalDuration, formatDuration } from '$lib/utils.js';
  
  onMount(async () => {
    foo = import('$lib/long-press-event.js');
    const msl = await loadMainSongCSV();
    $songlist = msl.data.map((x, index) => {
      let id = index;
      x.duration = formatDuration(x.duration)
      return {id, ...x}
    });
  });

  let currentSong;
  let showEdit = false;

  function editsong(event) {
    const song = event.detail.song;
    console.log('top level editsong() : ', song)
    currentSong = song;
    showEdit = true;
  }

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



  function updateSong(event) {
    let song = event.detail.song;
    console.log('updateSong: ', song);
    let index = $songlist.findIndex(x => x.id === song.id);
    $songlist[index] = song;
    $setlist = $setlist;
  }

</script>

<header>
  <h1>setlist thing</h1>
  <Controls />
  <Info />
  {#if showEdit}
  <EditSong song={currentSong} bind:showEdit on:updateSong={updateSong}/>
  {/if}
</header>

<div class="cols">
  <div class="songlist">
    <h2 class="h2">songs list</h2>
    <div class="heading">
      <input class="btn wide" type="search" name="search" bind:value={searchTerm} placeholder="search for a song">
      <input class="btn" type="reset" name="reset" value="X" alt="Clear the search vid" on:click={() => { searchTerm = ""}}>
      <div class="info">length: {getTotalDuration(filtered)} ({filtered.length} {filtered.length === 1 ? 'song' : 'songs'})</div>
    </div>
    {#if filtered.length}
    <div class="nomnop" transition:fade={{ delay: 250, duration: 300 }}>
      <Sorter bind:arr={$songlist} />
      <div class="innerlist">
        {#each filtered as song}
          <Song on:move={move} on:editsong={editsong} song={song} />
        {/each}
      </div>
    </div>
    {/if}
    
  </div>

  <div class="setlist">
    <h2 class="h2">set list</h2>
    <VerticalList2 on:move={move} on:editsong={editsong}  />
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
  .h2 {
    margin: 0 0 1rem 0;
    border-bottom: 1px solid #eee;
  }
  .info {
    display: inline-block;
    font-size: 0.75rem;
  }
</style>