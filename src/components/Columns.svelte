<script>
  import Chip from './Chip.svelte';
  import Card from './Card.svelte';
  import Count from './Count.svelte';
  import { dndzone } from 'svelte-dnd-action';
  import type { ContentTypeLookup } from '../services/data/content-types';
  import type { DcExtensionClient } from '../services/dc-extension-client';
  import type Status from '../services/models/status';
  export let handleConsider: any;
  export let handleFinalize: any;
  export let client: DcExtensionClient;
  export let statuses: Status[] = [];
  export let contentTypeLookup: ContentTypeLookup = Object.create(null);

  function showMore(e: Event, status: Status) {
    console.log('show more button clicked for status:', status);
  }
</script>

<style lang="scss">
  $color-primary: #039be5;
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
    position: relative;
    min-width: 136px;

    .counts-and-actions {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
    }

    .content-item-wrap {
      position: absolute;
      top: 110px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;
      background-color: transparent;
      &:focus {
        outline: none;
      }
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
      <Chip
        backgroundColor={status.backgroundColor}
        color={status.color}
        label={status.label || status.id} />
      <div class="counts-and-actions">
        <Count
          total={status.contentItems.page.totalElements}
          additionalInfo={status.hasDateLast7DaysFacet ? '(from last 7 days)' : ''}
          count={status.contentItems.page.elementsInCurrentPage} />
      </div>
      <div
        class="content-item-wrap"
        use:dndzone={{ items: status.contentItems.items, type: 'content-items', dropTargetStyle: { outline: 'none' }, dropFromOthersDisabled: !status.hydrated }}
        on:consider={(e) => handleConsider(status.id, e)}
        on:finalize={(e) => handleFinalize(status.id, e)}>
        {#each status.contentItems.items as contentItem (contentItem.id)}
          <Card
            target="{client.dcAppHost}/authoring/content-item/edit/{contentItem.id}"
            title={contentItem.label}
            subtitle={contentTypeLookup[contentItem.schema].label}
            footer="Last changed {contentItem.modified}" />
        {/each}
      </div>
    </div>
  {/each}
</div>
