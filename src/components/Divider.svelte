<script>
  export let vertical: string = '';
</script>

<style lang="scss">
  .divider {
    &.vertical {
      border-right: 1px solid #e5e5e5;
      height: 20px;
      margin: 0 16px;
    }

    &.horizontal {
      border-bottom: 1px solid #e5e5e5;
      width: 100%;
    }
  }
</style>

<div class="divider {vertical ? 'vertical' : 'horizontal'}" />
