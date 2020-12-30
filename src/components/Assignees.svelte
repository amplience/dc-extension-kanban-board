<script>
  import type { User } from "dc-extensions-sdk/dist/types/lib/components/Users";
  import Gravatar from "./Gravatar.svelte";

  export let users: User[] = [];

</script>

<style lang="scss">

</style>

<div class="assignees">
  {#each users as user}
  <Gravatar {user} />
  {/each}
</div>
