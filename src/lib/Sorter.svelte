<script>
  import { sortByKey } from '$lib/utils.js';
  export let arr;

  let directionToggle = false;
	function sortMe(key) {
    console.log('Sorter: ',key);
		directionToggle = !directionToggle;
		let tmp = sortByKey(arr, key, directionToggle);
		arr = [...tmp];
	}
  let keys = ['title', 'duration', 'tuning'];
</script>


<div class="btns-wrapper">
  {#each keys as k}
    <button class="btn" on:click={() => sortMe(k)} title="sort by {k}">{k}</button>
  {/each}
</div>