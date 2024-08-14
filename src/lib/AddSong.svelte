<script>
  import { songlist } from '$lib/stores.js';
  import { formatDuration } from '$lib/utils.js';
  let song ={title:'', duration:'00:00', tuning:''};
  let toggle = false;

  function addSong () {
    let id=$songlist.length+1;
    song.duration = formatDuration(song.duration);
    $songlist = [{id:id, ...song}, ...$songlist];
    toggle=false;
  }
</script>

<div class="addsong-wrapper">
  <button class="btn" title="this will add a new song to the songs list" on:click={() => toggle = !toggle}>
    {toggle ? 'close' : 'new song'}
  </button>
  {#if toggle}
    <div class="addsongform">
      <!-- <form on:submit={addSong}> -->
        <label for="title">title:
          <input type="text" name="title" bind:value={song.title} placeholder="title" />
        </label><br>
        <label for="duration">length:
          <input type="text" name="duration" bind:value={song.duration} placeholder="duration" />
        </label><br>
        <label for="tuning">tuning:
          <input type="text" name="tuning" bind:value={song.tuning} placeholder="tuning" />
        </label>
        <input type="submit" on:click={addSong} value="add">
      <!-- </form> -->
    </div>
  {/if}
</div>