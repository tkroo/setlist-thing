<script>
  import { writeFile, papaReadCSV, printDiv } from '$lib/utils.js';
  import { songlist, setlist } from '$lib/stores.js';
  import FileInput from '$lib/FileInput.svelte';
  import AddSong from '$lib/AddSong.svelte';

  function cleanUp(data) {
    return data.map(x => ({title:x.title.trim(), duration:x.duration.trim(), tuning:x.tuning.trim()}));
  }

  function readFile2(event, list) {
    const reader = new FileReader();
    reader.onload = async(event) => {
      let tmp = await papaReadCSV(event.target.result);
      tmp.data = cleanUp(tmp.data);
      if(list == 'setlist') {
        $setlist = tmp.data.map((x, index) => ({id:index, ...x}));
      } else {
        $songlist = tmp.data.map((x, index) => ({id:index, ...x}));
      }
    }
    const file = event.detail.file;
    reader.readAsText(file);
  }

  function moveAll() {
    $setlist = [...$setlist, ...$songlist];
  }
  
</script>

<div class="controls">
  <FileInput
    id='setlistinput'
    title='replace the current setlist'
    labelText='load setlist'
    on:changed={(e) => {readFile2(e, 'setlist')}}
  />
  <button class="btn" disabled={!$setlist.length} on:click={() => { writeFile($setlist, `setlist.csv`, 'text/csv') }} title="this saves the current setlist in a .csv file">save</button>
  <button class="btn" disabled={!$setlist.length} on:click={() => printDiv('SETLISTPRINT')} title="this will print the current setlist (experimental)">print</button>
  <FileInput
    id='songlistinput'
    title='replace the list of songs'
    labelText='load song list'
    on:changed={(e) => {readFile2(e, 'songlist')}}
  />
  <button class="btn" disabled={!$songlist.length} on:click={() => { writeFile($songlist, `songlist-example.csv`, 'text/csv') }} title="this saves the songs list in a .csv file">save song list</button>
  <AddSong />
  <!-- <button on:click={moveAll}>add all</button> -->
</div>

