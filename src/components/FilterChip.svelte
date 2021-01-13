<script lang="ts">
  import DeleteIcon from '../assets/icons/ic-delete.svg';
  import Icon from './Icon.svelte';
  import { createEventDispatcher } from 'svelte';
  export let label: string;
  export let active: boolean = false;
  export let removeable: boolean = false;
  export let clickable: boolean = false;

  $: chipClass = [
    active ? 'active' : undefined,
    clickable ? 'clickable' : undefined,
    removeable ? 'removeable' : undefined,
  ]
    .filter(() => !undefined)
    .join(' ');

  const dispatch = createEventDispatcher();

  const onChipClick = () => dispatch('click');
  const onCloseClick = (event: Event) => {
    event.cancelBubble = true;
    dispatch('close');
  };
</script>

<style>
  div {
    min-width: 0;
    display: flex;
    background-color: hsl(0, 0%, 95%);
    padding: 6px 8px;
    border-radius: 12px;
    margin-right: 12px;
  }

  span.label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    font-weight: 400;
  }

  div.active {
    background-color: #039be5;
    color: #fff;
  }

  div.clickable {
    cursor: pointer;
  }

  div.removeable > span.label {
    padding: 0 6px 0 0;
  }

  div.clickable:hover {
    background-color: #badff9;
  }
  span.cross {
    cursor: pointer;
    padding: 0;
  }

  span.cross :global(div) {
    position: relative;
  }
</style>

<div data-testid="chip" on:click={onChipClick} class={chipClass}>
  <span class="label"> {label} </span>
  {#if removeable}
    <span
      data-testid="remove-chip-button"
      class="cross"
      on:click={onCloseClick}>
      <Icon icon={DeleteIcon} width="8px" height="8px" />
    </span>
  {/if}
</div>
