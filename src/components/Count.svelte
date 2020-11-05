<script>
  export let count: number = 0;
  export let total: number = 0;
  export let additionalInfo: string | undefined;
</script>

<style lang="scss">
  .count {
    font-size: 13px;
    color: #333;
    margin: 10px;
  }
  .bold {
    color: #333;
    font-size: 16px;
    font-weight: 500;
  }
</style>

<div class="count">
  <span class="bold">{count}</span>
  content item{#if count !== 1}s{/if}
  {#if count !== total}of {total}{/if}
  {#if additionalInfo}{additionalInfo}{/if}
</div>
