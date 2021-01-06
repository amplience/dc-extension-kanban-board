<script>
  import type { User } from 'dc-extensions-sdk/dist/types/lib/components/Users';
  import type { FacetedContentItem } from 'dc-management-sdk-js';
  import { onMount } from 'svelte';
  import Columns from './components/Columns.svelte';
  import Error from './components/Error.svelte';
  import Header from './components/Header.svelte';
  import Loader from './components/Loader.svelte';
  import Toolbar from './components/Toolbar.svelte';
  import {
    contentRepositories,
    contentTypes,
    userService,
    workflowStates,
  } from './services/data';
  import { fetchByStatusId } from './services/data/content-items';
  import type { StatusTotals } from './services/data/content-items';
  import type { ContentTypeLookup } from './services/data/content-types';
  import { initDcExtensionClient } from './services/dc-extension-client';
  import type Status from './services/models/status';
  import { contentItems } from './services/stores/content-items';
  import { extensionClient } from './services/stores/extensionClient';
  import { hub } from './services/stores/hub';
  import { users } from './services/stores/users';
  import { totalsPerStatus } from './services/stores/status-totals';
  import { contentItemFacets } from './services/stores/content-item-facets';

  let statuses: Status[] = [];
  let contentTypeLookup: ContentTypeLookup = {};
  let userList: User[] = [];
  let contentItemsPath: string;
  let loading: boolean = true;
  let error: string = '';

  onMount(async () => {
    try {
      $extensionClient = await initDcExtensionClient();
      [
        contentItemsPath,
        statuses,
        contentTypeLookup,
        userList,
      ] = await Promise.all([
        contentRepositories.getContentItemPath($extensionClient),
        workflowStates.fetchAndHydrate($extensionClient),
        contentTypes.fetchAll($extensionClient),
        userService.fetchAll($extensionClient),
      ]);

      $users = userList;
      $hub = $extensionClient.hub;
    } catch (e) {
      error = e.message;
      console.error(e);
    } finally {
      loading = false;
    }
  });

  $: (async () => {
    try {
      const {
        contentItems: facetedContentItems,
        statusTotals,
      } = await fetchByStatusId(
        $extensionClient,
        $extensionClient.statuses.map(({ id }) => id),
        $contentItemFacets
      );

      $contentItems = facetedContentItems;
      $totalsPerStatus = statusTotals;
    } catch {
      error = 'Unable to load content items';
    }
  })();
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  :global(body, html) {
    width: max-content;
    min-width: 100%;
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

{#if loading}
  <Loader />
{:else if error}
  <Error
    reason="An error occurred while loading. Please check your dashboard extension is set up correctly." />
{:else}
  <Header {contentItemsPath} />
  <Toolbar />
  <Columns {statuses} {contentTypeLookup} />
{/if}
