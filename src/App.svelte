<script>
  import Columns from './components/Columns.svelte';
  const statuses = [
    { label: 'Hello', color: 'red' },
    { label: 'There', color: 'pink' },
    { label: 'You', color: 'orange' },
    { label: 'Lovely', color: 'purple' },
    { label: 'Person', color: 'blue' },
  ];
  const contentItems = [
    {
      label: 'Hero Banner',
      contentType: 'Banner',
      modified: new Date('2020/01/01'),
    },
    {
      label: 'Final summer design',
      contentType: 'Hero',
      modified: new Date('2020/02/01'),
    },
    {
      label: 'An example of something great',
      contentType: 'Carousel',
      modified: new Date('2020/03/01'),
    },
    {
      label: 'First lawnmower',
      contentType: 'Slide',
      modified: new Date('2020/04/04'),
    },
  ];
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  :global(body, html) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  :global(*) {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }
</style>

<Columns {statuses} {contentItems} />
