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
  import Loader from './components/Loader.svelte';
  import Error from './components/Error.svelte';
  import {
    DcExtensionClient,
    initDcExtensionClient,
  } from './services/dc-extension-client';
  import ContentItem from './services/models/content-item';
  import type { ContentTypeLookup } from './services/data/content-types';
  import type Status from './services/models/status';

  let client: DcExtensionClient;
  let statuses: Status[] = [];
  let contentTypeLookup: ContentTypeLookup = {};
  let contentItemsCount: number;
  let contentItemsPath: string;
  let fromStatusId: string;
  let toStatusId: string;
  let loading: boolean = true;
  let error: string = '';
  const hoverColour = '#039BE5';
  let originalDropTarget: HTMLDivElement;

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
        statuses[fromStatusIndex].contentItems.page.elementsInCurrentPage--;
        statuses[toStatusIndex].contentItems.page.elementsInCurrentPage++;
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
    if (e.detail.info.trigger === TRIGGERS.DRAG_STARTED) {
      (e.target as HTMLDivElement).style.borderColor = 'transparent';
      originalDropTarget = e.target as HTMLDivElement;
    }

    if (e.target !== originalDropTarget) {
      if (e.detail.info.trigger === TRIGGERS.DRAGGED_ENTERED) {
        (e.target as HTMLDivElement).style.borderColor = 'green';
      }
      if (e.detail.info.trigger === TRIGGERS.DRAGGED_LEFT) {
        (e.target as HTMLDivElement).style.borderColor = hoverColour;
      }
    }
    statuses[statusIndex].contentItems.items = e.detail.items as ContentItem[];
  }
  async function handleFinalize(statusId: string, e: CustomEvent<DndEvent>) {
    const listItems: ContentItem[] = e.detail.items.map((item) => {
      return new ContentItem(item);
    });
    const statusIndex = statuses.findIndex(
      (status: any) => status.id == statusId
    );
    statuses[statusIndex].contentItems.items = listItems;
    if (e.detail.info.trigger === TRIGGERS.DROPPED_INTO_ZONE) {
      const droppedItem: ContentItem = listItems.filter(
        (item) => item.id === e.detail.info.id
      )[0];
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
      (e.target as HTMLDivElement).style.borderColor = '';
    }
  }
  onMount(async () => {
    try {
      client = await initDcExtensionClient({ debug: true });
      [contentItemsPath, statuses, contentTypeLookup] = await Promise.all([
        contentRepositories.getContentItemPath(client),
        workflowStates.fetchAndHydrateWithContentItems(client),
        contentTypes.fetchAll(client),
      ]);

      contentItemsCount = workflowStates.getContentItemsCount(statuses);
    } catch (e) {
      error = e.message;
      console.error(e);
    } finally {
      loading = false;
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
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
</style>

<section>
  {#if loading}
    <Loader />
  {:else if error}
    <Error reason="An error occured while loading: {error}" />
  {:else}
    <Header {contentItemsCount} {contentItemsPath} />
    <Toolbar />
    <Columns
      {statuses}
      {handleConsider}
      {handleFinalize}
      {contentTypeLookup}
      {client} />
  {/if}
</section>
