<script>
  export let count: number = 0;
  export let total: number = 0;
  export let additionalInfo: string | undefined;
</script>

<style lang="scss">
  .count {
    font-size: 13px;
    color: #676767;
    margin: 10px;
  }
  .bold {
    color: #333;
    font-size: 16px;
  }
</style>

<div class="count">
  <span class="bold">{count}</span>
  {#if count !== total}of {total}{/if}
  content items
  {#if additionalInfo}{additionalInfo}{/if}
</div>
