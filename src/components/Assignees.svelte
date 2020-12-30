<script>
  import type { User } from "dc-extensions-sdk/dist/types/lib/components/Users";
  import Gravatar from "./Gravatar.svelte";

  export let users: User[] = [];

  function getAssigneeLabel() {
    if (users.length < 1) {
      return '';
    }
    return `Assigned to ${users.map(user => `${user.firstName} ${user.lastName}`).join(', ')}`;
  }

</script>

<style lang="scss">
  .assignees span {
    font-size: 13px;
    font-weight: 400;
    color: #333;
  }

</style>

<div class="assignees" title={getAssigneeLabel()}>
  {#if users.length > 0}
  <Gravatar user={users[0]} />
    {#if users.length > 1}
    <span>+{users.length - 1}</span>
    {/if}
  {/if}
</div>
