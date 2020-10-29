<script>
  import { onMount } from 'svelte';
  import {contentRepositories, contentItems, contentTypes, workflowStates} from './services/data';
  import Toolbar from './components/Toolbar.svelte';
  import Columns from './components/Columns.svelte';
  import Header from './components/Header.svelte';  
  import Loader from './components/Loader.svelte';
  import Error from './components/Error.svelte';
  import { DcExtensionClient, init } from './services/dc-extension-client';
  import type ContentItem from './services/models/content-item';
  import type { StatusWithContentItemCollection } from './services/data/workflow-states';
  import type { ContentTypeLookup } from './services/data/content-types';


  let client: DcExtensionClient;
  let statuses: Array<StatusWithContentItemCollection> = [];
  let contentTypeLookup: ContentTypeLookup = {};
  let contentItemsCount: number;
  let contentItemsPath: string;
  let loading: boolean = true;
  let error: string = '';

  function handleConsider(statusId: string, e: CustomEvent<DndEvent>) {
    const statusIndex = statuses.findIndex(
      (status: any) => status.id == statusId
    );
    statuses[statusIndex].contentItems.items = e.detail.items as ContentItem[];
  }
  async function handleFinalize(statusId: string, e: CustomEvent<DndEvent>) {
    const listItems: ContentItem[] = e.detail.items as ContentItem[];
    const statusIndex = statuses.findIndex(
      (status: any) => status.id == statusId
    );
    if (e.detail.info.trigger !== 'droppedIntoAnother') {
      const droppedItem: ContentItem = listItems.filter(
        (item) => item.id === e.detail.info.id
      )[0] as ContentItem;
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
    }
  }

  onMount(async () => {
    try {
      const client = await init({ debug: true });
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
    overflow: hidden;
    display: flex;
    flex-direction: column
  }
</style>
<section>
  {#if loading}
    <Loader/>
  {:else if error} 
    <Error reason="An error occured while loading: {error}"></Error>   
  {:else}   
    <Header {contentItemsCount} {contentItemsPath} />
    <Toolbar/>
    <Columns {statuses} {handleConsider} {handleFinalize} {contentTypeLookup} /> 
  {/if}
</section>