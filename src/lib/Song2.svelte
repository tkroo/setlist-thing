<script>
  export let song;
  import { longpress } from '$lib/actions.js'
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  
  function move() {
    dispatch("move", { song });
  }
  
  function editsong() {
    dispatch("editsong", { song });
  }
</script>

<!-- <button class="song btn" use:longpress on:longpress={editsong} on:click={move}> -->
<button class="song btn" data-id={song.id} on:click={move}>
  <span class="title">{song.title}</span>
  <span class="duration">{song.duration}</span>
  <span class="tuning">{song.tuning ? song.tuning : ''}</span>
</button>

<style>
  .title {
    text-align: left;
  }

  .btn {
    outline: 0;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
</style>