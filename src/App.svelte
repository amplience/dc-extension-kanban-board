<script>
  import { onMount } from 'svelte';
  import { contentItems } from './services/data';
  import Columns from './components/Columns.svelte';
  import { init } from './services/dc-extension-client';
  import { toDcQueryStr } from './utils';
  import type { DcClient } from './services/dc-client';
  import type ContentItem from './services/models/content-item';

  let dcClient: DcClient;
  let hydratedStatuses: any = [];

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
        dcClient,
        droppedItem,
        statusId
      );
      droppedItem['lastModifiedDate'] = response['lastModifiedDate'];
      hydratedStatuses[statusIndex].contentItems.items = listItems.sort(
        (a: ContentItem, b: ContentItem): number => {
          const aTicks = new Date(a['lastModifiedDate']).getTime();
          const bTicks = new Date(b['lastModifiedDate']).getTime();
          return bTicks - aTicks;
        }
      );
    }
  }

  onMount(async () => {
    try {
      const client = await init({ debug: true });
      const { statuses, hubId, contentRepositoryId, folderId } = client;
      dcClient = client.dcClient as DcClient;
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
