<script>
  export let song;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  function move() {
    console.log('Song2 component', song);
    dispatch("move", { song });
  }
</script>

<button class="song btn" on:click={move}>
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