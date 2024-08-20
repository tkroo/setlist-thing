<script>
  import { sortByKey } from '$lib/utils.js';
  import { setlist, songlist } from '$lib/stores.js';
  export let list = 'songlist';

  let directionToggle = false;
	function sortMe(key) {
    console.log('Sorter: ',key);
		directionToggle = !directionToggle;
    if(list == 'setlist') {
      $setlist = sortByKey($setlist, key, directionToggle);
    } else {
      $songlist = sortByKey($songlist, key, directionToggle);
    }
	}

  let keys = ['title', 'duration', 'tuning'];
</script>


<div class="sorter-wrapper">
  {#each keys as k}
    <button class="btn" on:click={() => sortMe(k)} title="sort by {k}">{k}</button>
  {/each}
</div>