<script>
  import { onMount } from 'svelte';
  import { contentItems } from './services/data';
  import Columns from './components/Columns.svelte';
  import { init } from './services/dc-extension-client';
  import { toDcQueryStr } from './utils';
  import type { DcClient } from './services/dc-client';

  let dcClient: DcClient;
  let hydratedStatuses: any = [];

  function handleConsider(statusId: any, e: CustomEvent<DndEvent>) {
    const statusIndex = hydratedStatuses.findIndex(
      (status: any) => status.id == statusId
    );
    hydratedStatuses[statusIndex].contentItems.items = e.detail.items;
  }
  function handleFinalize(statusId: any, e: CustomEvent<DndEvent>) {
    const statusIndex = hydratedStatuses.findIndex(
      (status: any) => status.id == statusId
    );
    hydratedStatuses[statusIndex].contentItems.items = e.detail.items;
    if (e.detail.info.trigger === 'droppedIntoAnother') {
      contentItems.updateWorkflowStatus(dcClient, e.detail.info.id, statusId);
    }
  }

  onMount(async () => {
    try {
      const client = await init({ debug: true });
      const { statuses, hubId, contentRepositoryId, folderId } = client;
      if(client.dcClient) {
        dcClient = client.dcClient;
      }
      hydratedStatuses = await contentItems.fetchHydrated(
        dcClient,
        hubId,
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
