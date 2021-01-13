<script lang="ts">
  export let icon: string;
  export let className = '';
  export let width = '24px';
  export let height = '24px';
</script>

<style>
  div {
    display: inline-block;
    width: var(--icon-width);
    height: var(--icon-height);
    color: #333;
  }

  div :global(svg) {
    width: var(--icon-width);
    height: var(--icon-height);
  }
</style>

<div class={className} style="--icon-width: {width}; --icon-height: {height}">
  {@html icon}
</div>
