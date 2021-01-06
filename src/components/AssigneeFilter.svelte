<script lang="ts">
  import type { User } from 'dc-extensions-sdk/dist/types/lib/components/Users';
  import { onMount } from 'svelte';
  import FilterIcon from '../assets/icons/ic-filter.svg';
  import { selectedAssignees } from '../services/stores/filters/selected-assignees';
  import { users } from '../services/stores/users';
  import FilterChip from './FilterChip.svelte';
  import Icon from './Icon.svelte';
  import Overlay from './Overlay.svelte';

  let sectionElement: HTMLElement;
  let isModalVisible: boolean = false;
  let modalPositionStyle = '';
  let assignees: User[] = [];

  onMount(() => {
    assignees = $selectedAssignees;
  });

  function updateAssigneeFilter() {
    $selectedAssignees = assignees;
  }

  function removeAssigneeFromFilter(id: string) {
    removeAssignee(id);
    updateAssigneeFilter();
  }

  function updateAssignees(user: User) {
    const existing = assignees.some((assignee) => assignee.id === user.id);

    if (existing) {
      removeAssignee(user.id);
    } else {
      assignees.push(user);
    }

    updateAssigneeFilter();
  }

  function removeAssignee(id: string) {
    assignees = assignees.filter((assignee) => assignee.id !== id);
  }

  function showModal() {
    const targetBound = sectionElement.getBoundingClientRect();
    modalPositionStyle = [
      `top: ${targetBound.y + targetBound.height}px`,
      `left: ${targetBound.x}px`,
    ].join(';');

    isModalVisible = true;
  }

  function onCancelClick() {
    isModalVisible = false;
  }

  function assigneeIncludedInFilter(userId: string) {
    return assignees.some((assignee) => assignee.id === userId);
  }
</script>

<style lang="scss">
  section {
    background-color: #fff;
    padding: 5px;
    position: relative;
  }

  .assignee-filter {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .assignee-filter span {
    font-size: 13px;
    font-weight: 400;
    padding-right: 10px;
    cursor: pointer;
  }

  .assignee-filter div.filter-icon {
    height: 20px;
    width: 20px;
    padding: 5px;
    background-color: hsl(0, 0%, 90%);
    border-radius: 4px;
    margin-right: 8px;
    cursor: pointer;
  }

  .assignee-filter div.assignee-names {
    display: flex;
    flex-direction: row;
  }

  .modal-popup {
    background-color: #fff;
    position: fixed;
    width: 500px;
    --webkit-box-shadow: 0 3px 13px rgba(0, 0, 0, 0.2);
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.2);
    z-index: 3;
  }
</style>

{#if isModalVisible}
  <Overlay onClick={onCancelClick} />
{/if}
<section bind:this={sectionElement}>
  <div class="assignee-filter">
    <span on:click={showModal}>Assignee</span>
    <div class="assignee-names">
      {#if $selectedAssignees.length < 1}
        <FilterChip label="All" on:click={showModal} clickable={true} />
      {:else}
        {#each $selectedAssignees as assignee}
          <FilterChip
            label={`${assignee.firstName} ${assignee.lastName}`}
            removeable={true}
            on:close={() => removeAssigneeFromFilter(assignee.id)}
            on:click={showModal}
            clickable={true} />
        {/each}
      {/if}
    </div>
    <div class="filter-icon" on:click={showModal}>
      <Icon icon={FilterIcon} width="20px" height="20px" />
    </div>
  </div>
  {#if isModalVisible}
    <div class="modal-popup" style={modalPositionStyle}>
      <ul>
        {#each $users as user}
          <li>
            <label for={user.id}>{user.firstName} {user.lastName}</label>
            <input
              type="checkbox"
              value={user.id}
              name={user.id}
              on:change={() => updateAssignees(user)}
              checked={assigneeIncludedInFilter(user.id)} />
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</section>
