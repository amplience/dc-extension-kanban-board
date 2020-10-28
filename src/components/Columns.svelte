<script>
  import Chip from './Chip.svelte';
  import Card from './Card.svelte';
  import Count from './Count.svelte';
  import { dndzone } from 'svelte-dnd-action';
  import type { StatusWithContentItemCollection } from '../services/data/content-items';
  export let handleConsider: any;
  export let handleFinalize: any;
  export let statuses: Array<StatusWithContentItemCollection> = [];
</script>

<style lang="scss">
  .grid {
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 8px;
    height: 100%;
    width: 100%;
    padding: 0.5em;
  }
  .col {
    box-sizing: border-box;
    background: #eee;
    overflow-y: hidden;

    .content-item-wrap {
      overflow-y: auto;
      height: calc(100% - 90px);
    }
  }
</style>

<div
  class="grid"
  style="grid-template-columns:{Array(statuses.length + 1)
    .join('1fr ')
    .trim()}">
  {#each statuses as status (status.id)}
    <div class="col">
      <Chip color={status.color} label={status.label} />
      <Count
        total={status.contentItems.page.totalElements}
        count={status.contentItems.items.length} />
      <div
        class="content-item-wrap"
        use:dndzone={{ items: status.contentItems.items, type: 'content-items' }}
        on:consider={(e) => handleConsider(status.id, e)}
        on:finalize={(e) => handleFinalize(status.id, e)}>
        {#each status.contentItems.items as contentItem (contentItem.id)}
          <Card
            title={contentItem.label}
            subtitle={contentItem.contentType}
            footer="Last changed {contentItem.modified}" />
        {/each}
      </div>
    </div>
  {/each}
</div>
