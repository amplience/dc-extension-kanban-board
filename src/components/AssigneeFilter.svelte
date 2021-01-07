<script lang="ts">
  import type { User } from 'dc-extensions-sdk/dist/types/lib/components/Users';
  import { onMount } from 'svelte';
  import FilterIcon from '../assets/icons/ic-filter.svg';
  import { selectedAssignees } from '../services/stores/filters/selected-assignees';
  import { users } from '../services/stores/users';
  import FilterChip from './FilterChip.svelte';
  import Icon from './Icon.svelte';
  import Overlay from './Overlay.svelte';
  import List, { Graphic, Item, Label } from '@smui/list';
  import Checkbox from '@smui/checkbox';

  let sectionElement: HTMLElement;
  let isModalVisible: boolean = false;
  let modalPositionStyle = '';
  let assignees: string[] = [];

  function updateAssigneeFilter(items: string[]) {
    $selectedAssignees = items;
  }

  function removeAssigneeFromFilter(id: string) {
    assignees = assignees.filter((assignee) => assignee !== id);
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

  function getAssigneeLabel(id: string): string {
    const assignee = $users.find((user) => user.id === id);
    return `${assignee?.firstName} ${assignee?.lastName}`;
  }

  $: updateAssigneeFilter(assignees);
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
    padding: 10px 16px;
    background-color: #fff;
    position: fixed;
    width: 500px;
    --webkit-box-shadow: 0 3px 13px rgba(0, 0, 0, 0.2);
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.2);
    z-index: 3;
  }

  .modal-popup h3 {
    font-size: 14px;
    font-weight: 500;
  }

  .modal-popup :global(.mdc-list-item) {
    height: 25px;
    font-size: 13px;
  }

  .modal-popup :global(.mdc-list-item__graphic) {
    margin-right: 5px;
  }

  .modal-popup
    :global(.mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)
      ~ .mdc-checkbox__background) {
    height: 15px;
    width: 15px;
    border-width: 2px;
    border-color: #cccccc;
  }
</style>

{#if isModalVisible}
  <Overlay onClick={onCancelClick} />
{/if}
<section bind:this={sectionElement}>
  <div class="assignee-filter">
    <span on:click={showModal}>Assignee</span>
    <div class="assignee-names">
      {#if assignees.length < 1}
        <FilterChip label="All" on:click={showModal} clickable={true} />
      {:else}
        {#each assignees as assignee}
          <FilterChip
            label={getAssigneeLabel(assignee)}
            removeable={true}
            on:close={() => removeAssigneeFromFilter(assignee)}
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
      <h3>Assignee</h3>
      <List checklist>
        {#each $users as user}
          <Item>
            <Graphic>
              <Checkbox bind:group={assignees} value={user.id} />
            </Graphic>
            <Label>{user.firstName} {user.lastName}</Label>
          </Item>
        {/each}
      </List>
    </div>
  {/if}
</section>
