<script>
  import { writeFile, papaReadCSV, printDiv } from '$lib/utils.js';
  import { songlist, setlist } from '$lib/stores.js';
  import AddSong from '$lib/AddSong.svelte';
  function readFile(event, list) {
    const reader = new FileReader();
    reader.onload = async(event) => {
      let tmp = await papaReadCSV(event.target.result);
      if(list == 'setlist') {
        $setlist = tmp.data.map((x, index) => ({id:index, ...x}));
      } else {
        $songlist = tmp.data.map((x, index) => ({id:index, ...x}));
      }
    }
    const file = event.target.files[0];
    reader.readAsText(file);
  }

  function moveAll() {
    $setlist = [...$setlist, ...$songlist];
  }
  
</script>

<div class="controls">
  <label for="setlistinput" class="btn custom-file-load" title="this will replace the current setlist">load setlist
    <input
    id="setlistinput"
    type="file"
    class="input"
    name="setlistinput"
    on:change={(e) => {readFile(e, 'setlist')}} />
  </label>
  <button class="btn" disabled={!$setlist.length} on:click={() => { writeFile($setlist, `setlist.csv`, 'text/csv') }} title="this saves the current setlist in a .csv file">save</button>
  <button class="btn" disabled={!$setlist.length} on:click={() => printDiv('SETLISTPRINT')} title="this will print the current setlist (experimental)">print</button>
  <label for="songlistinput" class="btn custom-file-load" title="this will replace the list of songs to choose from">load song list
    <input
    id="songlistinput"
    type="file"
    class="input"
    name="songlistinput"
    on:change={(e) => {readFile(e, 'songlist')}} />
  </label>
  <AddSong />
  <!-- <button on:click={moveAll}>add all</button> -->
</div>

