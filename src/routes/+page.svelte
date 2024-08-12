<script>
  import VerticalList2 from '$lib/dnd/VerticalList2.svelte';
  import Song from '$lib/Song2.svelte';
  import AddSong from '$lib/AddSong.svelte';
  import mainlist from "$lib/songlist.json";
  import { setlist, songlist } from "$lib/stores.js";
  import { onMount } from 'svelte';
  import { sortByKey, writeFile, papaReadCSV, getTotalDuration, printDiv } from '$lib/utils.js';

  // let songs = [];
  // let setlist = [];

  
  onMount(() => {
    $songlist = [...mainlist];
    $songlist = $songlist.map((x, index) => ({id:index, ...x}));
    // for (let i =0 ; i < mainlist.length; i++) {
    //   $songlist.push({id:i, ...mainlist[i]});
    // }
  });


  let directionToggle = false;

  async function readFile(event, whichList) {
    const reader = new FileReader();
    reader.onload = async(event) => {
      let tmp = await papaReadCSV(event.target.result);

      if(whichList == 'setlist') {
        $setlist = tmp.data.map((x, index) => ({id:index, ...x}));
      } else {
        $songlist = tmp.data.map((x, index) => ({id:index, ...x}));
      }
    }
    const file = event.target.files[0];
    reader.readAsText(file);
  }

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

  function addSong (obj) {
    let id=$songlist.length+1;
    $songlist = [{id:id, ...obj.detail.song}, ...$songlist];
  }

  // function moveAll() {
  //   $setlist = [...$setlist, ...$songs];
  // }

  let searchTerm = "";
	$: filtered = $songlist.filter((x) => x.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  function sortMe(key) {
    directionToggle = !directionToggle
    let tmp = sortByKey(filtered, key, directionToggle);
    filtered = tmp;
  }

  // $: fooDuration = getTotalDuration($setlist);

</script>


<h1>setlist thing</h1>
<p>SET LENGTH: {getTotalDuration($setlist)} {$setlist.length} {$setlist.length === 1 ? 'song' : 'songs'}</p>
<div class="cols">

  <div class="songlist">
    <AddSong on:add={addSong} />
    <label for="songlistinput" class="btn custom-file-load">load song list
        <input
        id="songlistinput"
        type="file"
        class="input"
        name="songlistinput"
        on:change={(e) => {readFile(e, 'songlist')}} />
      </label>
      <form>
      <input type="search" name="search" bind:value={searchTerm} placeholder="filter...">
      <input type="reset" name="reset" value="X" alt="Clear the search form" on:click={() => { searchTerm = ""}}>
    </form>
    <header>
      <button on:click={() => sortMe('name')}>title</button>
      <button on:click={() => sortMe('duration')}>duration</button>
      <button on:click={() => sortMe('tuning')}>tuning</button>
    </header>
    <!-- <button on:click={moveAll}>add all</button> -->
    <div class="innerlist">
      <small>click a song to add</small>
      {#each filtered as song}
        <Song on:move={move} song={song} />
      {/each}
    </div>
    
  </div>

  <div class="setlist">
    <div class="buttons-wrap">
      <label for="setlistinput" class="btn custom-file-load">load setlist
        <input
        id="setlistinput"
        type="file"
        class="input"
        name="setlistinput"
        on:change={(e) => {readFile(e, 'setlist')}} />
      </label>
      <button class=".btn" disabled={!setlist.length} on:click={() => { writeFile(setlist, `setlist.csv`, 'text/csv') }}>save setlist</button>  
    </div>
    <button on:click={() => printDiv('SETLISTPRINT')}>print set list</button>
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

  #SETLISTPRINT {
    display: none;
  }

  :global(body) {
    background-color: #333;
    color: #fff;
    font-family: sans-serif;
  }
  .cols {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .buttons-wrap {
    display: flex;
    justify-content: space-between;
  }
  .buttons-wrap>label, .buttons-wrap>button {
    width: 100%;
  }

  .songlist, .setlist {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    /* border: 1px solid #ffcc00; */
  }

  header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    width: 100%;
    padding: 0.5rem 0;
    gap: 0.5rem;
  }

  .innerlist {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow: scroll;
		/* min-height: 4rem; */
    height: 70vh;
  }
  .btn, .input::file-selector-button {
    /* display: inline-block; */
    outline: 0;
    font-family: inherit;
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    text-align: center;
    /* font-weight: 400; */
    line-height: inherit;
    border: 1px solid;
    border-radius: 0.25rem;
    color: #000;
    background-color: #eee;
    border-color: #444;
    transition: 0.3s ease-in-out;
    transition-property: color, background-color, border-color;
    margin: 0;
  }
  .btn, .input::file-selector-button:hover {
    /* background-color: #666; */
    /* border-color: #666; */
    transition-duration: 0.2s;
  }
  #setlistinput, #songlistinput {
    display: none;
  }

</style>