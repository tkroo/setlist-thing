<!-- if you're not using typescript, remove lang="ts" attribute from the script tag -->
<script context="module">
  // for passing focus on to the next Modal in the queue.
  // A module context level object is shared among all its component instances. [Read More Here](https://svelte.dev/tutorial/sharing-code)
  const modalList = []
</script>

<script>
  import { booleanStore } from '$lib/stores.js'

  const store = booleanStore(false)
  const { isOpen, open, close } = store
  function keydown(e) {
    e.stopPropagation()
    if (e.key === 'Escape') {
      close()
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

<slot name="trigger" {open}>
  <!-- fallback trigger to open the modal -->
  <button class="btn" on:click={open}>Open</button>
</slot>
{#if $isOpen}
  <div class="modal" use:modalAction tabindex="0">
    <div class="backdrop" on:click={close} />

    <div class="content-wrapper">
      <slot name="header" {store}>
        <!-- fallback -->
        <div>
          <h1>Your Modal Heading Goes Here...</h1>
        </div>
      </slot>

      <div class="content">
        <slot name="content" {store} />
      </div>

      <div class="footer">
      <slot name="footer" {store}>
        <!-- fallback -->
          <h1>Your Modal Footer Goes Here...</h1>
          <button on:click={close}>Close</button>
        </slot>
      </div>
    </div>

  </div>
{/if}


<style>
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