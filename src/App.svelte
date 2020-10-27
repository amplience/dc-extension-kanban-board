<script>
  import { onMount } from 'svelte';
  import { init } from 'dc-extensions-sdk';
  import { contentItems } from './services/data';
  import Columns from './components/Columns.svelte';
  import { DcClient } from './services/dc-client';
  import type { StatusWithContentItemCollection } from './services/data/content-items';

  interface ExtensionParams {
    hubId?: string | undefined;
    installation: ExtensionInstallationParams;
  }

  interface ExtensionInstallationParams {
    repositoryId?: string | undefined;
    statuses: string[];
  }

  function handleConsider(statusId: any, e: CustomEvent<DndEvent>) {
    // const statusIndex = boardStatuses.findIndex(
    //   (status: any) => status.id == statusId
    // );
    // boardStatuses[statusIndex].contentItems.items;
  }
  function handleFinalize(statusId: any, e: CustomEvent<DndEvent>) {
    // const statusIndex = statuses.findIndex(
    //   (status: any) => status.id == statusId
    // );
    // statuses[statusIndex].contentItems.items = e.detail.items;
    // console.log('Update DC via management SDK...');
  }

  let fetchHydratedStatuesWithContentItemsPromise: Promise<
    StatusWithContentItemCollection[]
  >;

  onMount(async () => {
    try {
      const sdk = await init({ debug: true });
      const {
        hubId,
        installation: { repositoryId, statuses = [] },
      } = sdk.params as ExtensionParams;
      if (!hubId) {
        throw new Error('Hub id required');
      }
      if (!repositoryId) {
        throw new Error('Repository id required');
      }
      const dcClient = new DcClient(sdk.client);
      fetchHydratedStatuesWithContentItemsPromise = contentItems.fetchHydratedStatuesWithContentItems(
        dcClient,
        hubId,
        statuses,
        { query: `status:"ACTIVE"contentRepositoryId:"${repositoryId}"` }
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
  }
  :global(*) {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }
</style>

{#await fetchHydratedStatuesWithContentItemsPromise}
  loading...
{:then statuses}
  <Columns {statuses} {handleConsider} {handleFinalize} />
{/await}
