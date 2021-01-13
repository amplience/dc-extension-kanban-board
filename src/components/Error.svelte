<script lang="ts">
  export let reason: string = '';
</script>

<style lang="scss">
  .error {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    color: #999;
    .message {
      max-width: 500px;
    }
  }
</style>

<div class="error">
  <div class="message">{reason}</div>
</div>
