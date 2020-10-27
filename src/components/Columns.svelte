<script>
  import Chip from './Chip.svelte';
  import Card from './Card.svelte';
  import Count from './Count.svelte';
  interface contentItem {
    label: string;
    contentType: string;
    modified: Date;
  }
  interface status {
    id: string;
    color: string;
    label: string;
    contentItems: contentItem[]
  }
  export let statuses: Array<status> = [];
  console.log(statuses)
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
      {#each status.contentItems._embedded['content-items'] as contentItem}
        <Card
          title={contentItem.label}
          subtitle={contentItem.contentType}
          footer="Last changed {contentItem.modified.toLocaleDateString()} {contentItem.modified.toLocaleTimeString()}" />
      {/each}
    </div>
  {/each}
</div>
