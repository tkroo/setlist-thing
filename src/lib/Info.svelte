<script>
  let toggle = false;
  function toggleInfo() {
    toggle = !toggle;
  }
</script>

<div class="info-wrapper">
  <button class="btn btn-link" on:click={toggleInfo}>info</button>
  {#if toggle}
    <div class="info-backdrop">
      <div class="info-inner">
        <button class="btn" on:click={() => toggle = false}>X</button>
        <slot />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .info-wrapper {
    position: relative;
  }
  .info-backdrop {
    position: fixed;
    width: 100wh;
    height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: grid;
    place-content: center;
    background-color: hsla(0, 0%, 100%, 0.5);
  }
  .info-inner {
    position: relative;
    width: 100%;
    padding: 1rem;
    background-color: #333;
    color: #eee;
    border-radius: 0.25rem;
    button {
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      aspect-ratio: 1/1;
    }
    :global(h2) {
      margin: 0;
    }
  }

</style>