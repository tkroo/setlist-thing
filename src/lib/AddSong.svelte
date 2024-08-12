<script>
  let song ={name:'', duration:'00:00', tuning:''};
  let toggle = false;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<button on:click={() => toggle = !toggle}>add new song</button>
{#if toggle}
<form on:submit={() => dispatch("add", { song })}>
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
{/if}