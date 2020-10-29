<script>
  import { onMount } from 'svelte';
  import {
    contentRepositories,
    contentItems,
    contentTypes,
    workflowStates,
  } from './services/data';
  import { TRIGGERS } from 'svelte-dnd-action';
  import Toolbar from './components/Toolbar.svelte';
  import Columns from './components/Columns.svelte';
  import Header from './components/Header.svelte';
  import { DcExtensionClient, init } from './services/dc-extension-client';
  import ContentItem from './services/models/content-item';
  import type { StatusWithContentItemCollection } from './services/data/workflow-states';
  import type { ContentTypeLookup } from './services/data/content-types';

  let client: DcExtensionClient;
  let statuses: Array<StatusWithContentItemCollection> = [];
  let contentTypeLookup: ContentTypeLookup = {};
  let contentItemsCount: number;
  let contentItemsPath: string;
  let fromStatusId: string;
  let toStatusId: string;

  // reactive block required to wrangle status id content item is dragged from and status id item is
  // being dragged to.
  $: {
    if (fromStatusId?.length && toStatusId?.length) {
      const fromStatusIndex = statuses.findIndex(
        (status: any) => status.id == fromStatusId
      );
      const toStatusIndex = statuses.findIndex(
        (status: any) => status.id == toStatusId
      );
      if (fromStatusId !== toStatusId) {
        statuses[fromStatusIndex].contentItems.page.totalElements--;
        statuses[toStatusIndex].contentItems.page.totalElements++;
      }
      fromStatusId = '';
      toStatusId = '';
    } else if (toStatusId?.length) {
      toStatusId = '';
    }
  }

  function handleConsider(statusId: string, e: CustomEvent<DndEvent>) {
    const statusIndex = statuses.findIndex(
      (status: any) => status.id == statusId
    );
    statuses[statusIndex].contentItems.items = e.detail.items.map((item) => {
      return new ContentItem(item);
    });
  }
  async function handleFinalize(statusId: string, e: CustomEvent<DndEvent>) {
    const listItems: ContentItem[] = e.detail.items.map((item) => {
      return new ContentItem(item);
    });
    if (e.detail.info.trigger === TRIGGERS.DROPPED_INTO_ZONE) {
      const statusIndex = statuses.findIndex(
        (status: any) => status.id == statusId
      );
      const droppedItem: ContentItem = new ContentItem(
        listItems.filter((item) => item.id === e.detail.info.id)
      );
      const response: ContentItem = await contentItems.updateWorkflowStatus(
        client.dcClient,
        droppedItem,
        statusId
      );
      droppedItem['lastModifiedDate'] = response['lastModifiedDate'];
      statuses[statusIndex].contentItems.items = listItems.sort(
        (a: ContentItem, b: ContentItem): number => {
          const aTicks = new Date(a['lastModifiedDate']).getTime();
          const bTicks = new Date(b['lastModifiedDate']).getTime();
          return bTicks - aTicks;
        }
      );
      toStatusId = statusId;
    } else if (e.detail.info.trigger === TRIGGERS.DROPPED_INTO_ANOTHER) {
      fromStatusId = statusId;
    }
  }
  onMount(async () => {
    try {
      client = await init({ debug: true });
      [contentItemsPath, statuses, contentTypeLookup] = await Promise.all([
        contentRepositories.getContentItemPath(client),
        workflowStates.fetchAndHydrateWithContentItems(client),
        contentTypes.fetchAll(client),
      ]);

      contentItemsCount = workflowStates.getContentItemsCount(statuses);
    } catch (e) {
      console.error(e);
    }
  });
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  :global(body, html) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
  }
  :global(*) {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  section {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>

<section>
  <Header {contentItemsCount} {contentItemsPath} />
  <Toolbar />
  {#if statuses.length === 0}
    loading...
  {:else}
    <Columns {statuses} {handleConsider} {handleFinalize} {contentTypeLookup} />
  {/if}
</section>
