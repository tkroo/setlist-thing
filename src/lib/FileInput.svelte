<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let id="inputID";
  export let title="title text";
  export let labelText="labelText";

  const changed=(e) => {
    const file = e.target.files[0];
    dispatch('changed', {file})
  }

</script>

<label for={id} class="btn custom-file-load" title={title}>{labelText}
  <input
    id={id}
    type="file"
    class="input"
    name={id}
    on:change={changed} />
</label>