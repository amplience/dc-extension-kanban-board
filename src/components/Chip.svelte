<script lang="ts">
  import Truncate from './Truncate.svelte';
  export let backgroundColor: string = '';
  export let color: string = '';
  export let label: string = '';
</script>

<style lang="scss">
  .chip {
    min-width: 120px;
    max-width: 227px;
    margin: 0 2px 0 10px;
    font-size: 13px;
    box-sizing: border-box;
    border-radius: 9px;
    color: white;
    padding: 0.15em 0.5em;
    display: inline-block;
    margin: 0.5em;
    text-align: center;
    height: 24px;
    line-height: 24px;

    &.light {
      color: #f2f2f2;
    }

    &.dark {
      color: #333333;
    }
  }
</style>

<div class="chip {color}" style="background-color: {backgroundColor}">
  <Truncate text={label} />
</div>
