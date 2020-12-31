<script>
  import type { DcExtensionClient } from "../services/dc-extension-client";
  import type { FacetedContentItem } from 'dc-management-sdk-js';
  import type { ContentTypeLookup } from "../services/data/content-types";
  import { formatDate } from "../utils";
  import type { User } from "dc-extensions-sdk/dist/types/lib/components/Users";
  import Assignees from "./Assignees.svelte";
  import { users } from "../services/stores/users";

  export let client: DcExtensionClient;
  export let contentItem: FacetedContentItem;
  export let contentTypeLookup: ContentTypeLookup = Object.create(null);

  let target: string|undefined = '';

  if (client) {
    target = client.dashboardSdk.applicationNavigator.openContentItem(contentItem, {returnHref: true});
  }

  function getAssignedUsers(): User[] {
    if (!contentItem.assignees) {
      return [];
    }

    return $users.filter(user => contentItem?.assignees.includes(user.id))
  }
</script>

<style lang="scss">
  .card {
    background-color: white;
    padding: 10px 10px 20px;
    border-radius: 3px;
    margin: 10px 8px;

    &:focus {
      outline-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    a {
      text-decoration: none;
      :hover {
        color: #039be5;
      }
    }

    .title {
      display: inline;
      color: #333;
      font-size: 13px;
      margin: 0 0 4px 0;
      font-weight: 500;
      overflow-wrap: break-word;
    }
    .subtitle {
      overflow-wrap: break-word;
    }
    .subtitle,
    .footer {
      font-size: 0.9em;
      color: #999;
      font-size: 13px;
    }
  }
</style>

<section
  class="card"
  on:dblclick={() => {
    client.dashboardSdk.applicationNavigator.openContentItem(contentItem);
  }}>
  <a href={target} target="_top">
    <h1 class="title">{contentItem.label}</h1>
  </a>
  <div>
    <span class="subtitle">{contentTypeLookup[contentItem.schema]?.settings?.label}</span>
    <Assignees users={getAssignedUsers()} />
    <footer class="footer">Last changed {formatDate(contentItem.lastModifiedDate)}</footer>
  </div>
</section>
