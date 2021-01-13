<script lang="ts">
  export let text: string = '';
</script>

<style lang="scss">
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<div class="truncate" title={text}>{text}</div>
