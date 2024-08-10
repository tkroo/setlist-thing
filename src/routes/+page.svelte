<script>
  // import VerticalList from '$lib/dnd/VerticalList.svelte';
  import VerticalList2 from '$lib/dnd/VerticalList2.svelte';
  import Song from '$lib/Song2.svelte';
  import songlist from "$lib/songlist-flat.json";
  import { sortByKey } from '$lib/utils.js';

  let songs = songlist;
  let setlist = [];
  let directionToggle = false;


  function move(event) {
    const s = event.detail.song;
    if (setlist.find(x => x.name === s.name)) {
      setlist = setlist.filter(x => x.name !== s.name);
      return;
    } else {
      let song = songs.find(x => x.name === s.name);
      setlist = [...setlist, song];
    }
  }

  let searchTerm = "";
	$: filtered = songs.filter((x) => x.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  function sortMe(key) {
    directionToggle = !directionToggle
    let tmp = sortByKey(filtered, key, directionToggle);
    filtered = tmp;
  }

</script>



<h1>setlist thing</h1>
<div class="cols">

  <div class="songlist">
    <input type="text" bind:value={searchTerm} placeholder="search...">
    <header>
      <button on:click={() => sortMe('name')}>title</button>
      <button on:click={() => sortMe('length')}>duration</button>
      <button on:click={() => sortMe('tuning')}>tuning</button>
      <span> </span>
    </header>
    {#each filtered as song}
    <Song on:move={move} song={song} />
    {/each}
    <!-- <VerticalList on:move={move} items={songs}/> -->

  </div>

  <div class="setlist">
    <p>set list </p>
    <VerticalList2 on:move={move} items={setlist} />
  </div>
</div>


<style>
  .cols {
    width: 100%;
    display: flex;
    gap: 2rem;
    /* justify-content: space-between; */
  }

  .songlist, .setlist {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    width: 100%;
    padding: 0.5rem;
    border-bottom: 1px solid #000;
  }

</style>