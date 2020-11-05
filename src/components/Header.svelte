<script>
  import Divider from './Divider.svelte';

  export let contentItemsCount: number = 0;
  export let contentItemsPath: string = '';
</script>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 8px;
    right: 8px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .info {
      display: flex;
      height: 100%;
      align-items: center;
    }

    .label {
      font-size: 13px;
      color: #999;
      &.repo-folder {
        margin-right: 24px;
      }
    }

    .value {
      font-weight: 500;
      font-size: 16px;
      color: #333;
    }
  }
</style>

<header>
  <div class="info">
    <div class="info__count">
      <span class="value">{contentItemsCount}</span>
      <span class="label">content items</span>
    </div>
    <Divider vertical="true" />
    <div>
      <span class="label repo-folder">Repo / folder</span>
      <span class="value">{contentItemsPath || 'none'}</span>
    </div>
  </div>
  <Divider />
</header>
