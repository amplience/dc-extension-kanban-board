<script>
  import Chip from './Chip.svelte';
  import Card from './Card.svelte';
  import Count from './Count.svelte';
  import type { StatusWithContentItemCollection } from '../services/data/content-items';
  export let statuses: Array<StatusWithContentItemCollection> = [];
</script>

<style lang="scss">
  .grid {
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 0.5em;
    height: 100%;
    width: 100%;
    padding: 0.5em;
  }
  .col {
    box-sizing: border-box;
    background: #eee;
  }
</style>

<div
  class="grid"
  style="grid-template-columns:{Array(statuses.length + 1)
    .join('1fr ')
    .trim()}">
  {#each statuses as status}
    <div class="col">
      <Chip color={status.color} label={status.label} />
      <Count total={200} count={20} />
      {#each status.contentItems.items as contentItem}
        <Card
          title={contentItem.label}
          subtitle={contentItem.contentType}
          footer="Last changed {contentItem.modified}" />
      {/each}
    </div>
  {/each}
</div>
