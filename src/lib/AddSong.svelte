<script>
  import { songlist } from '$lib/stores.js';
  let song ={name:'', duration:'00:00', tuning:''};
  let toggle = false;

  function addSong () {
    let id=$songlist.length+1;
    $songlist = [{id:id, ...song}, ...$songlist];
  }
</script>

<div class="addsong-wrapper">
  <button class="btn" title="this will add a new song to the songs list" on:click={() => toggle = !toggle}>
    {toggle ? 'close' : 'add new song'}
  </button>
  {#if toggle}
    <div class="addsongform">
      <form on:submit={addSong}>
        <label for="title">title:
          <input type="text" name="title" bind:value={song.name} placeholder="title" />
        </label><br>
        <label for="duration">length:
          <input type="text" name="duration" bind:value={song.duration} placeholder="duration" />
        </label><br>
        <label for="tuning">tuning:
          <input type="text" name="tuning" bind:value={song.tuning} placeholder="tuning" />
        </label>
        <input type="submit" value="add">
      </form>
    </div>
  {/if}
</div>