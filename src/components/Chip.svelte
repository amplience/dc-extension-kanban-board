<script>
  export let color: string = '';
  export let label: string = '';
</script>

<style lang="scss">
  .chip {
    box-sizing: border-box;
    border-radius: 1em;
    color: white;
    padding: 0.15em 0.5em;
    display: inline-block;
    margin: 0.5em;
    width: auto;
  }
</style>

<div class="chip" style="background-color: {color}">{label}</div>
