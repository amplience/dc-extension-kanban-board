<script lang="ts">
  import {
    ContentItem,
    FacetedContentItem,
    WorkflowState,
  } from 'dc-management-sdk-js';
  import { dndzone, TRIGGERS } from 'svelte-dnd-action';
  import type { ContentTypeLookup } from '../services/data/content-types';
  import type Status from '../services/models/status';
  import {
    contentItems,
    getByStatusId,
  } from '../services/stores/content-items';
  import { totalsPerStatus } from '../services/stores/status-totals';
  import Card from './Card.svelte';
  import Chip from './Chip.svelte';
  import Count from './Count.svelte';
  import Error from './Error.svelte';

  const hoverColour = '#039BE5';
  let originalDropTarget: HTMLDivElement;
  let droppedItem: FacetedContentItem;
  let toStatusId: string;
  let contentItemsByStatus: { [k: string]: FacetedContentItem[] } = {};

  export let statuses: Status[] = [];
  export let contentTypeLookup: ContentTypeLookup = Object.create(null);

  function sortByLastModified(
    contentItems: FacetedContentItem[]
  ): FacetedContentItem[] {
    return contentItems.sort((a, b): number => {
      const aTicks = new Date(a['lastModifiedDate']).getTime();
      const bTicks = new Date(b['lastModifiedDate']).getTime();
      return bTicks - aTicks;
    });
  }

  function handleConsider(statusId: string, e: CustomEvent<DndEvent>) {
    if (e.detail.info.trigger === TRIGGERS.DRAG_STARTED) {
      (e.target as HTMLDivElement).style.borderColor = 'transparent';
      originalDropTarget = e.target as HTMLDivElement;
    }

    if (e.target !== originalDropTarget) {
      if (e.detail.info.trigger === TRIGGERS.DRAGGED_ENTERED) {
        (e.target as HTMLDivElement).style.backgroundColor = hoverColour;
      }
      if (e.detail.info.trigger === TRIGGERS.DRAGGED_LEFT) {
        (e.target as HTMLDivElement).style.backgroundColor = 'transparent';
      }
    } else {
      (e.target as HTMLDivElement).style.backgroundColor = 'transparent';
    }
    contentItemsByStatus[statusId] = e.detail.items as FacetedContentItem[];
  }

  async function handleFinalize(statusId: string, e: CustomEvent<DndEvent>) {
    const listItems = e.detail.items as FacetedContentItem[];
    contentItemsByStatus[statusId] = sortByLastModified(listItems);

    if (e.detail.info.trigger === TRIGGERS.DROPPED_INTO_ZONE) {
      toStatusId = statusId;
      droppedItem = listItems.find(
        (item) => item.id === e.detail.info.id
      ) as FacetedContentItem;
      (e.target as HTMLDivElement).style.backgroundColor = 'transparent';
    } else if (e.detail.info.trigger === TRIGGERS.DROPPED_INTO_ANOTHER) {
      const response: ContentItem = await droppedItem.related.assignWorkflowState(
        new WorkflowState({ id: toStatusId })
      );
      droppedItem['lastModifiedDate'] = response['lastModifiedDate'];

      contentItemsByStatus[toStatusId] = sortByLastModified(
        contentItemsByStatus[toStatusId] as FacetedContentItem[]
      );
      totalsPerStatus.decrementStatusTotals(statusId);
      totalsPerStatus.incrementStatusTotals(toStatusId);
      toStatusId = '';
    }
  }

  function isLastStatus(id: string) {
    return (
      statuses.findIndex((status) => status.id === id) === statuses.length - 1
    );
  }

  function initContentByStatus(contentItems: FacetedContentItem[]) {
    const itemsByStatus: { [k: string]: FacetedContentItem[] } = {};
    statuses.forEach((status) => {
      itemsByStatus[status.id] = getByStatusId(contentItems, status.id);
    });

    return itemsByStatus;
  }

  $: contentItemsByStatus = initContentByStatus($contentItems);
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
            total={$totalsPerStatus[status.id]}
            additionalInfo={isLastStatus(status.id) ? '(from last 7 days)' : ''}
            count={contentItemsByStatus[status.id].length} />
        {/if}
      </div>
      {#if !status.hydrated}
        <Error reason="Unable to load content items" />
      {:else}
        <div
          class="content-item-wrap"
          use:dndzone={{ items: contentItemsByStatus[status.id], type: 'content-items', dropTargetStyle: { outline: 'none' }, dropFromOthersDisabled: !status.hydrated }}
          on:consider={(e) => handleConsider(status.id, e)}
          on:finalize={(e) => handleFinalize(status.id, e)}>
          {#each contentItemsByStatus[status.id] as contentItem (contentItem.id)}
            <Card {contentItem} {contentTypeLookup} />
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
