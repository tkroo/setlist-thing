<script>
  import Nav from '$lib/Nav.svelte';
</script>

<header>
  <h1>setlist thing</h1>
  <Nav />
</header>
<h2>info</h2>
<p>Files are saved as .csv files and look like:</p>
<table>
  <thead>
    <tr>
      <th>name</th>
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


<style>
  table {
    font-size: 0.85rem;
    display: table;
    border-spacing: 2px;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: 0;
    text-align: left;
    border-collapse: collapse;
  }
  tr {
	  border-bottom: 1px solid;
  }

  th, td {
    border: 1px solid;
    padding: 0.25rem;
  }




</style>