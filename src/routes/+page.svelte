<script>
  // import VerticalList from '$lib/dnd/VerticalList.svelte';
  import VerticalList2 from '$lib/dnd/VerticalList2.svelte';
  import Song from '$lib/Song2.svelte';
  import songlist from "$lib/songlist.json";
  import { sortByKey, writeFile, readCSV, getTotalDuration } from '$lib/utils.js';

  let songs = [];
  for (let i =0 ; i < songlist.length; i++) {
    songs.push({id:i, ...songlist[i]});
  }

  // let songs = songlist;
  let setlist = [];
  let directionToggle = false;

  function readFile(event) {
  	const file = event.target.files[0];
    console.log('readFile() ', file)
    const reader = new FileReader();

    reader.onload = async(event) => {
      const data = event.target.result;
      let tmp = readCSV(data);
      let foo = [];
      if (tmp) {
        for (let i =0 ; i < tmp.length; i++) {
          foo.push({id:i, ...tmp[i]});
        }
        console.log('foo: ',foo);
        setlist = foo;
      }
    }
    reader.readAsText(file);
  }



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

  $: fooDuration = getTotalDuration(setlist);

</script>


<h1>setlist thing</h1>
<div class="cols">

  <div class="songlist">
    <form>
      <input type="search" name="search" bind:value={searchTerm} placeholder="search...">
      <input type="reset" name="reset" value="X" alt="Clear the search form" on:click={() => { searchTerm = ""}}>
    </form>
    
    <header>
      <button on:click={() => sortMe('name')}>title</button>
      <button on:click={() => sortMe('duration')}>duration</button>
      <button on:click={() => sortMe('tuning')}>tuning</button>
      <span> </span>
    </header>
    <div class="innerlist">
      <small>click a song to add</small>
      {#each filtered as song}
        <Song on:move={move} song={song} />
      {/each}
    </div>
    
  </div>

  <div class="setlist">
    <VerticalList2 on:move={move} bind:items={setlist} />
    <div class="buttons-wrap">

      <label for="file-load" class="btn custom-file-load">load setlist
        <input
        id="file-load"
        type="file"
        class="input"
        name="file-load"
        on:change={readFile} />
      </label>
      <button class=".btn" disabled={!setlist.length} on:click={() => { writeFile(setlist, `set_${fooDuration}.csv`, 'text/csv') }}>save setlist</button>  
    </div>
  </div>
</div>


<style>
  :global(body) {
    background-color: #333;
    color: #fff;
    font-family: sans-serif;
  }
  .cols {
    width: 100%;
    display: flex;
    gap: 2rem;
    /* justify-content: space-between; */
  }

  .buttons-wrap {
    display: flex;
    margin-top: 1rem;
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
    margin: 0 6px 0 2px;
  }
  .btn, .input::file-selector-button:hover {
    /* background-color: #666; */
    /* border-color: #666; */
    transition-duration: 0.2s;
  }
  #file-load {
    display: none;
  }

</style>