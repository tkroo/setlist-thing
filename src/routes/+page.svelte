<script>
  import SongsList from '$lib/SongsList.svelte';
  import SetList from '$lib/SetList.svelte';
  import Controls from '$lib/Controls.svelte';
  import Info from "$lib/Info.svelte";
  import EditSong from "$lib/EditSong.svelte";
  import { setlist, songlist } from '$lib/stores.js';
  import { onMount } from 'svelte';
  import { loadMainSongCSV, formatDuration } from '$lib/utils.js';
  
  onMount(async () => {
    const msl = await loadMainSongCSV('/songlist.csv');
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

  function movesong(event) {
    const s = event.detail.song;
    console.log('top level movesong() :',s);
    if ($setlist.find(x => x.id === s.id)) {
      $setlist = $setlist.filter(x => x.id !== s.id);
      return;
    } else {
      let song = $songlist.find(x => x.id === s.id);
      $setlist = [...$setlist, song];
    }
  }

  function updateSong(event) {
    let song = event.detail.song;
    console.log('updateSong: ', song);
    let index = $songlist.findIndex(x => x.id === song.id);
    $songlist[index] = song;
    $setlist = $setlist;
  }

  let searchTerm = "";
	$: filtered = $songlist.filter((x) => x.title.toLowerCase().includes(searchTerm.toLowerCase()));

</script>

<svelte:head>
  <title>setlist thing</title>
</svelte:head>
<header>
  <h1>setlist thing</h1>
  <Controls />
  <Info />
  {#if showEdit}
  <EditSong song={currentSong} bind:showEdit on:updateSong={updateSong}/>
  {/if}
</header>

<div class="cols">
  <section class="songlist">
    <h2 class="h2">songs list</h2>
    <SongsList on:movesong={movesong} on:editsong={editsong}  />
  </section>

  <section class="setlist">
    <h2 class="h2">set list</h2>
    <SetList on:movesong={movesong} on:editsong={editsong}  />
  </section>
</div>

<div id="SETLISTPRINT">
  <ol>
    {#each $setlist as song}
    <li>{song.title}</li>
    {/each}
  </ol>
</div>

