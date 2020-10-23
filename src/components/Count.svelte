<script>
  export let count: number = 0;
  export let total: number = 0;
</script>

<style lang="scss">
  .count {
    font-size: 0.8em;
    color: rgb(103, 103, 103);
    margin: 1em;
  }
  .bold {
    color: #333;
    font-size: 1.5em;
  }
</style>

<div class="count">
  <span class="bold">{count}</span>
  of
  {total}
  content items
</div>
