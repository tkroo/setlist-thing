<script>
  // export let delay = 300;
  function foo(node, { prop, delay }) {
		// the node has been mounted in the DOM

    let waiting = false;
    let timeout = null;
    

    function handleClickType() {
        if (waiting) {
            clearTimeout(timeout);
            node.dispatchEvent(new CustomEvent('doubleClick', { detail: 'double'}));
            waiting = false;
            return;
        }
        waiting = true;
        timeout = setTimeout(() => {
            node.dispatchEvent(new CustomEvent('sglclick', { detail: 'single'}));
            waiting = false;
        }, delay);
    }

		//...LOGIC

    node.addEventListener('click', handleClickType);
    // node.addEventListener('dblclick', handleDoubleClick);
		node.dispatchEvent(new CustomEvent('emit', { detail: `hello ${prop} ${delay}` }));

		return {
			destroy() {
        node.removeEventListener('click', handleClick);
        // node.removeEventListener('mousedown', handleDoubleClick);
				// the node has been removed from the DOM
			}
		};
	}

  function handleEmit(event) {
    //...LOGIC
    console.log(event.detail);
  }
</script>

<button
  use:foo={{ delay: 200 }}
  on:sclick={() => console.log('singlesssss')}
  on:dclick={() => console.log('doubledoubleclickclick')}
>button use foo</button>


<style>
  button {
    padding: 4rem;
    font-size: 3rem;
  }
</style>