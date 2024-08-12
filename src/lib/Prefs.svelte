<script>
  let toggle = false;
</script>

<button on:click={() => toggle = !toggle}>prefs</button>
{#if toggle}
  <p>prefs</p>
{/if}