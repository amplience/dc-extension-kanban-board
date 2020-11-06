<script>
  export let target: string = '';
  export let title: string = '';
  export let subtitle: string = '';
  export let footer: string = '';
</script>

<style lang="scss">
  .card {
    background-color: white;
    padding: 10px 10px 20px;
    border-radius: 3px;
    margin: 10px 8px;

    &:focus {
      outline-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    a {
      text-decoration: none;
      :hover {
        color: #039be5;
      }
    }

    .title {
      display: inline;
      color: #333;
      font-size: 13px;
      margin: 0 0 4px 0;
      font-weight: 500;
      overflow-wrap: break-word;
    }
    .subtitle {
      overflow-wrap: break-word;
    }

    .assignee {
      margin: 8px 0;
      height: 28px;
    }
    .subtitle,
    .footer {
      font-size: 0.9em;
      color: #999;
      font-size: 13px;
    }
  }
</style>

<section
  class="card"
  on:dblclick={() => {
    window.parent.location.href = target;
  }}>
  <a href={target} target="_top">
    <h1 class="title">{title}</h1>
  </a>
  <div>
    <span class="subtitle">{subtitle}</span>
    <div class="assignee" />
    <footer class="footer">{footer}</footer>
  </div>
</section>
