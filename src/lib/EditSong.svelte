<script context="module">
  const modalList = []
</script>
<script>
  export let showEdit;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  
  export let song = {title:'foo', duration: '05:20', tuning: 'E'};
  function editSong () {
    song = {...song};
    dispatch('updateSong', {song});
  }

  import { booleanStore } from '$lib/stores.js'

  const store = booleanStore(false)
  const { isOpen, open, close } = store
  function keydown(e) {
    e.stopPropagation()
    if (e.key === 'Escape') {
      // close()
      showEdit = false;
    }
  }



  function transitionend(e) {
    const node = e.target
    node.focus()
  }
  function modalAction(node) {
    const returnFn = []
    // for accessibility
    if (document.body.style.overflow !== 'hidden') {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      returnFn.push(() => {
        document.body.style.overflow = original
      })
    }
    node.addEventListener('keydown', keydown)
    node.addEventListener('transitionend', transitionend)
    node.focus()
    modalList.push(node)
    returnFn.push(() => {
      node.removeEventListener('keydown', keydown)
      node.removeEventListener('transitionend', transitionend)
      modalList.pop()
      // Optional chaining to guard against empty array.
      modalList[modalList.length - 1]?.focus()
    })
    return {
      destroy: () => returnFn.forEach((fn) => fn()),
    }
  }

</script>

<div class="modal" use:modalAction tabindex="-1">
    <div class="backdrop" on:click={() => showEdit = false} />

    <div class="content-wrapper">
      <div>
        <h1>edit song</h1>
      </div>
      <div class="content">
        <div class="addform">
          <label for="title">title:
            <input type="text" name="title" bind:value={song.title} placeholder="title" />
          </label>
          <label for="duration">length:
            <input type="text" name="duration" bind:value={song.duration} placeholder="duration" />
          </label>
          <label for="tuning">tuning:
            <input type="text" name="tuning" bind:value={song.tuning} placeholder="tuning" />
          </label>
          <input type="submit" on:click={editSong} value="submit">
        </div>
      </div>

      <div class="footer">
      <slot name="footer" {store}>
        <!-- fallback -->
          <button class="btn" on:click={() => showEdit = false}>X</button>
        </slot>
      </div>
    </div>

  </div>


<style>
  .addform {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .addform label {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    gap:1rem;
  }
  

  div.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }
  div.modal:not(:focus-within) {
    transition: opacity 0.1ms;
    opacity: 0.99;
  }
  div.backdrop {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
  }
  div.content-wrapper {
    z-index: 10;
    max-width: 70vw;
    border-radius: 0.3rem;
    background-color: white;
    overflow: hidden;
    color: #333;
    padding: 1rem;
  }
  @media (max-width: 767px) {
    div.content-wrapper {
      max-width: 100vw;
    }
  }
  div.content {
    max-height: 50vh;
    overflow: auto;
  }
  h1 {
    opacity: 0.5;
    margin: 0;

  }
  .footer {
    margin-top: 1rem;
  }
</style>