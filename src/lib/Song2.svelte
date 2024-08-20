<script>
  export let song;
  import { doubleClk } from '$lib/actions.js'
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  
  function movesong() {
    dispatch("movesong", { song });
  }
  
  function editsong() {
    dispatch("editsong", { song });
  }
</script>

<button class="song btn" use:doubleClk={{delay: 300}} on:sclick={movesong} on:dclick={editsong}>
  <span class="title">{song.title}</span>
  <span class="duration">{song.duration}</span>
  <span class="tuning">{song.tuning ? song.tuning : ''}</span>
</button>
