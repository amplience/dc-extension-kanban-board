<script>
  import { dndzone } from 'svelte-dnd-action';
  import type { ContentTypeLookup } from '../services/data/content-types';
  import type { DcExtensionClient } from '../services/dc-extension-client';
  import type Status from '../services/models/status';
  import Card from './Card.svelte';
  import Chip from './Chip.svelte';
  import Count from './Count.svelte';
  import Error from './Error.svelte';

  export let handleConsider: any;
  export let handleFinalize: any;
  export let client: DcExtensionClient;
  export let statuses: Status[] = [];
  export let contentTypeLookup: ContentTypeLookup = Object.create(null);
</script>

<style lang="scss">
  $color-primary: #039be5;
  .grid {
    position: relative;
    top: 116px;
    padding: 0 8px;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 8px;
    height: calc(100% - 116px);
    width: 100%;
    overflow-x: auto;
    box-sizing: border-box;
    z-index: 1;
  }
  .col {
    box-sizing: border-box;
    background: #f2f2f2;
    overflow: hidden;
    position: relative;
    min-width: 240px;
    z-index: 1;

    .counts-and-actions {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
    }

    .content-item-wrap {
      position: absolute;
      top: 80px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;
      background-color: transparent;
      z-index: 1;
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
        {#if status.hydrated}
          <Count
            total={status.contentItems.page.totalElements}
            additionalInfo={status.hasDateLast7DaysFacet ? '(from last 7 days)' : ''}
            count={status.contentItems.page.elementsInCurrentPage} />
        {/if}
      </div>
      {#if !status.hydrated}
        <Error reason="Unable to find status" />
      {:else}
        <div
          class="content-item-wrap"
          use:dndzone={{ items: status.contentItems.items, type: 'content-items', dropTargetStyle: { outline: 'none' }, dropFromOthersDisabled: !status.hydrated }}
          on:consider={(e) => handleConsider(status.id, e)}
          on:finalize={(e) => handleFinalize(status.id, e)}>
          {#each status.contentItems.items as contentItem (contentItem.id)}
            <Card {client} {contentItem} {contentTypeLookup} />
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
