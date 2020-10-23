<script>
  export let title: string = '';
  export let subtitle: string = '';
  export let footer: string = '';
</script>

<style lang="scss">
  .card {
    box-sizing: border-box;
    background-color: white;
    margin: 0.5em 0.5em;
    padding: 1em;
  }
  p {
    margin: 0.5em;
  }
  .title {
    color: #333;
  }
  .subtitle,
  .footer {
    font-size: 0.9em;
    color: #999;
  }
</style>

<div class="card">
  <p class="title">{title}</p>
  <p class="subtitle">{subtitle}</p>
  <p class="footer">{footer}</p>
</div>
