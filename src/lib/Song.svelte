<script>
  export let name = "";
  export let length = "0:00";
  export let tuning = "";
</script>

<div class="song">
  <span class="title">{name}</span><span class="duration">{length}</span>
</div>

<style>
  .song {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    background-color: #b1edfc;
    color: #000;
    border-radius: 0.5rem;
  }
</style>