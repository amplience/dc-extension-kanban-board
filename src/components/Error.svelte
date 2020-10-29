<script>
  export let reason: string = '';
</script>

<style lang="scss">
  .error {
    height: 100%;
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #999;
  }
</style>

<div class="error">{reason}</div>
