<script>
  export let title: string = '';
  export let subtitle: string = '';
  export let footer: string = '';
</script>

<style lang="scss">
  .card {
    box-sizing: border-box;
    background-color: white;
    padding: 10px 10px 20px 10px;
    border-radius: 3px;
    margin: 10px;

    &:focus {
      outline-color: #039be5;
    }
  }

  .title {
    color: #333;
    font-size: 13px;
    margin-bottom: 4px;
  }
  .subtitle,
  .footer {
    font-size: 0.9em;
    color: #999;
    font-size: 13px;
  }
</style>

<section class="card">
  <h1 class="title">{title}</h1>
  <span class="subtitle">{subtitle}</span>
  <footer class="footer">{footer}</footer>
</section>
