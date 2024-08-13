<script>
  import Modal from '$lib/Modal1.svelte';
</script>

<Modal>
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
  </Modal>