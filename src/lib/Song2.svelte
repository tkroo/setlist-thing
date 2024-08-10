<script>
  export let song;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  function move() {
    dispatch("move", { song });
  }
</script>

<button class="song btn" on:click={move}>
  <span class="title">{song.name}</span>
  <span class="duration">{song.length}</span>
  <span class="tuning">{song.tuning ? song.tuning : ''}</span>
  <!-- <button on:click={move}>move</button> -->
</button>

<style>
  .song {
    display: grid;
    /* grid-template-columns: repeat(4, 1fr); */
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
    /* display: inline-block; */
    outline: 0;
    cursor: pointer;
    /* padding: 0.1rem 0.5rem; */
    /* font-size: 0.75rem; */
    /* font-weight: 400; */
    /* line-height: inherit; */
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
</style>