<script>
  import { writeFile, papaReadCSV, printDiv } from '$lib/utils.js';
  import { songlist, setlist } from '$lib/stores.js';
  import AddSong from '$lib/AddSong.svelte';
  import Gear from '$lib/svg/preferences-svgrepo-com.svelte';
  let toggle = false;
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
  
</script>

<div class="prefs-wrapper">
  <button class="btn btn-square" on:click={() => toggle = !toggle}><Gear /></button>
  {#if toggle}
  <div class="prefs">
    <label for="setlistinput" class="btn custom-file-load">load setlist
      <input
      id="setlistinput"
      type="file"
      class="input"
      name="setlistinput"
      on:change={(e) => {readFile(e, 'setlist')}} />
    </label>
    <button class="btn" disabled={!$setlist.length} on:click={() => { writeFile($setlist, `setlist.csv`, 'text/csv') }}>save setlist</button>  
    <button class="btn" disabled={!$setlist.length} on:click={() => printDiv('SETLISTPRINT')}>print set list</button>
    <AddSong />
    <label for="songlistinput" class="btn custom-file-load">load song list
      <input
      id="songlistinput"
      type="file"
      class="input"
      name="songlistinput"
      on:change={(e) => {readFile(e, 'songlist')}} />
    </label>    
  </div>
  {/if}
</div>
