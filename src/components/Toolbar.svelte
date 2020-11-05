<script>
  import Divider from './Divider.svelte';
</script>

<style lang="scss">
  .toolbar {
    margin: 0 8px 8px 8px;
    height: 40px;
    font-size: 13px;
  }

  .inner {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .label {
    color: #999;
    margin-right: 3px;
  }
</style>

<div class="toolbar">
  <div class="inner">
    <span class="label">Sorted by</span>
    <span>Last modified (most recent first)</span>
  </div>
  <Divider />
</div>
