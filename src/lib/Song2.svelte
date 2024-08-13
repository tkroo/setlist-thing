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
  .song {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    width: 100%;
    padding: 0.5rem;
    background-color: #b1edfc;
    color: #000;
    border-radius: 0.5rem;
  }

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