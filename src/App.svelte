<script>
  import { onMount } from 'svelte';
  import { contentItems } from './services/data';
  import Columns from './components/Columns.svelte';
  import { DcExtensionClient, init } from './services/dc-extension-client';
  import { toDcQueryStr } from './utils';
  import type { DcClient } from './services/dc-client';
  import type ContentItem from './services/models/content-item';

  let hydratedStatuses: any = [];
  let sdkClient: DcExtensionClient;

  function handleConsider(statusId: string, e: CustomEvent<DndEvent>) {
    const statusIndex = hydratedStatuses.findIndex(
      (status: any) => status.id == statusId
    );
    hydratedStatuses[statusIndex].contentItems.items = e.detail.items;
  }
  async function handleFinalize(statusId: string, e: CustomEvent<DndEvent>) {
    const listItems: ContentItem[] = e.detail.items as ContentItem[];
    const statusIndex = hydratedStatuses.findIndex(
      (status: any) => status.id == statusId
    );
    if (e.detail.info.trigger !== 'droppedIntoAnother') {
      const droppedItem: ContentItem = listItems.filter(
        (item) => item.id === e.detail.info.id
      )[0] as ContentItem;
      const response: ContentItem = await contentItems.updateWorkflowStatus(
        sdkClient.dcClient as DcClient,
        droppedItem,
        statusId
      );
      window.setTimeout(async () => {
        await loadHydratedStatuses(
          sdkClient.dcClient as DcClient,
          sdkClient.statuses,
          sdkClient.hubId as string,
          sdkClient.contentRepositoryId as string,
          sdkClient.folderId as string
        );
      }, 2000);
    }
  }

  async function loadHydratedStatuses(
    dcClient: DcClient,
    statuses: any[],
    hubId: string,
    contentRepositoryId: string,
    folderId: string
  ) {
    hydratedStatuses = await contentItems.fetchHydrated(
      dcClient,
      hubId as string,
      statuses,
      {
        query: toDcQueryStr({
          status: 'ACTIVE',
          contentRepositoryId,
          folderId,
        }),
      }
    );
  }

  onMount(async () => {
    try {
      sdkClient = await init({ debug: true });
      await loadHydratedStatuses(
        sdkClient.dcClient as DcClient,
        sdkClient.statuses,
        sdkClient.hubId as string,
        sdkClient.contentRepositoryId as string,
        sdkClient.folderId as string
      );
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
</style>

{#if hydratedStatuses.length === 0}
  loading...
{:else}
  <Columns statuses={hydratedStatuses} {handleConsider} {handleFinalize} />
{/if}
