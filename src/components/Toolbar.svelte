<script>
  import AssigneeFilter from './AssigneeFilter.svelte';
  import Divider from './Divider.svelte';
</script>

<style lang="scss">
  .toolbar {
    height: 40px;
    position: fixed;
    top: 60px;
    left: 8px;
    right: 8px;
    font-size: 13px;
    z-index: 2;
  }

  .inner {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .inner .sortInfo {
    padding-right: 40px;
  }

  .label {
    color: #999;
    margin-right: 3px;
  }
</style>

<div class="toolbar">
  <div class="inner">
    <div class="sortInfo">
      <span class="label">Sorted by</span>
      <span>Last modified (most recent first)</span>
    </div>
    <AssigneeFilter />
  </div>
  <Divider />
</div>
