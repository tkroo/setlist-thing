<script>
  import Modal from '$lib/Modal.svelte';
  import { songlist } from '$lib/stores.js';
  import { formatDuration } from '$lib/utils.js';
  // import { trapFocus } from './actions.js';
  let song ={title:'', duration:'00:00', tuning:''};
  let toggle = false;

  function addSong () {
    let id=$songlist.length+1;
    song.duration = formatDuration(song.duration);
    $songlist = [{id:id, ...song}, ...$songlist];
    toggle=false;
  }
</script>


<Modal>
  <div slot="trigger" let:open>
    <button class="btn" on:click={open}>add song</button>
  </div>
  <div slot="header">
    <h2 class="nomnop">add a song</h2>
  </div>
  <div slot="content">
    <div class="addform">
      <!-- <form on:submit={addSong}> -->
        <label for="title">title:
          <input type="text" name="title" bind:value={song.title} placeholder="title" />
        </label>
        <label for="duration">length:
          <input type="text" name="duration" bind:value={song.duration} placeholder="duration" />
        </label>
        <label for="tuning">tuning:
          <input type="text" name="tuning" bind:value={song.tuning} placeholder="tuning" />
        </label>
        <input class="btn" type="submit" on:click={addSong} value="add">
      <!-- </form> -->
    </div>
  </div>
  <div slot="footer" let:store={{close}}>
    <span class="r">
      <button class="btn" on:click={close}>X</button>
    </span>
  </div>
</Modal>

<style>
  .addform {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .addform label {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    gap:1rem;
  }
</style>

<!-- <div class="addsong-wrapper">
  <button class="btn" title="this will add a new song to the songs list" on:click={() => toggle = !toggle}>
    {toggle ? 'close' : 'new song'}
  </button>
  {#if toggle}
    <div class="addsongform" use:trapFocus>
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
    </div>
  {/if}
</div> -->