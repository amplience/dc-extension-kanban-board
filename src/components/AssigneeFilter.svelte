<script>
  import type { User } from 'dc-extensions-sdk/dist/types/lib/components/Users';
  import FilterChip from './FilterChip.svelte';
  import FilterIcon from '../assets/icons/ic-filter.svg';
  import Icon from './Icon.svelte';
  import Overlay from './Overlay.svelte';
  import { users } from '../services/stores/users';
  import { assigneesFilter } from '../services/stores/assignee-filter';

  let sectionElement: HTMLElement;
  let isModalVisible: boolean = false;
  let modalPositionStyle = '';

  function updateAssigneeFilter(user: User) {
    const existing = $assigneesFilter.findIndex(
      (assignee) => assignee.id === user.id
    );

    if (existing !== undefined) {
      removeAssigneeFromFilter(user.id);
    } else {
      $assigneesFilter.push(user);
    }
  }

  function removeAssigneeFromFilter(id: string) {
    $assigneesFilter = $assigneesFilter.filter(
      (assignee) => assignee.id === id
    );
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

  function isFiltered(userId: string) {
    return $assigneesFilter.some((assignee) => assignee.id === userId);
  }
</script>

<style lang="scss">
  section {
    background-color: #fff;
    padding: 5px;
    position: relative;
    z-index: 23;
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
  }

  .assignee-filter div.filter-icon {
    height: 20px;
    width: 20px;
    padding: 5px;
    background-color: hsl(0, 0%, 90%);
    border-radius: 4px;
    margin-right: 8px;
  }

  .modal-popup {
    background-color: #fff;
    position: fixed;
    width: 500px;
    z-index: 23;
    --webkit-box-shadow: 0 3px 13px rgba(0, 0, 0, 0.2);
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.2);
  }
</style>

{#if isModalVisible}
  <Overlay onClick={onCancelClick} />
{/if}
<section bind:this={sectionElement}>
  <div class="assignee-filter">
    <span on:click={showModal}>Assignee</span>
    <div class="assignee-names">
      {#if $assigneesFilter.length < 1}
        <FilterChip label="All" on:click={showModal} />
      {:else}
        {#each $assigneesFilter as assignee}
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
              on:change={() => updateAssigneeFilter(user)}
              checked={isFiltered(user.id)} />
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</section>
