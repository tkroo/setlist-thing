<script>
  import Modal from '$lib/Modal.svelte';
</script>

<Modal>
  <div slot="trigger" let:open>
    <button class="btn btn-link" on:click={open}>info</button>
  </div>
  <div slot="header">
    <h2 class="nomnop">info</h2>
  </div>
  <div slot="content">
    <p>Files are saved as .csv files and look like:</p>
    <table>
      <thead>
        <tr>
          <th>title</th>
          <th>duration</th>
          <th>tuning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Song Title</td>
          <td>03:45</td>
          <td>E</td>
        </tr>
        <tr>
          <td>Another Song Title</td>
          <td>04:25</td>
          <td>E</td>
        </tr>
        <tr>
          <td>And Another Song Title</td>
          <td>02:15</td>
          <td>D</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div slot="footer" let:store={{close}}>
    <span class="r">
      <button class="btn" on:click={close}>X</button>
    </span>
  </div>
</Modal>

<!-- <Modal linkText={"info"}>
    <h2>info</h2>
    <p>Files are saved as .csv files and look like:</p>
    <table>
      <thead>
        <tr>
          <th>title</th>
          <th>duration</th>
          <th>tuning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Song Title</td>
          <td>03:45</td>
          <td>E</td>
        </tr>
        <tr>
          <td>Another Song Title</td>
          <td>04:25</td>
          <td>E</td>
        </tr>
        <tr>
          <td>And Another Song Title</td>
          <td>02:15</td>
          <td>D</td>
        </tr>
      </tbody>
    </table>
  </Modal> -->