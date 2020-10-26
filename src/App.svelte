<script>
  import Columns from './components/Columns.svelte';
  import { onMount } from 'svelte';
  let statuses: any[] = [];
  let statusesTemplate = [
    {
      label: 'Hello',
      color: 'red',
      contentItems: [
        {
          label: 'Hero Banner',
          contentType: 'Banner',
          modified: new Date('2020/01/01'),
          id: createUUID(),
        },
        {
          label: 'Final summer design',
          contentType: 'Hero',
          modified: new Date('2020/02/01'),
          id: createUUID(),
        },
        {
          label: 'An example of something great',
          contentType: 'Carousel',
          modified: new Date('2020/03/01'),
          id: createUUID(),
        },
        {
          label: 'First lawnmower',
          contentType: 'Slide',
          modified: new Date('2020/04/04'),
          id: createUUID(),
        },
      ],
      id: createUUID(),
    },
    {
      label: 'There',
      color: 'pink',
      contentItems: [
        {
          label: 'Hero Banner',
          contentType: 'Banner',
          modified: new Date('2020/01/01'),
          id: createUUID(),
        },
        {
          label: 'Final summer design',
          contentType: 'Hero',
          modified: new Date('2020/02/01'),
          id: createUUID(),
        },
        {
          label: 'An example of something great',
          contentType: 'Carousel',
          modified: new Date('2020/03/01'),
          id: createUUID(),
        },
        {
          label: 'First lawnmower',
          contentType: 'Slide',
          modified: new Date('2020/04/04'),
          id: createUUID(),
        },
      ],
      id: createUUID(),
    },
    {
      label: 'You',
      color: 'orange',
      contentItems: [
        {
          label: 'Hero Banner',
          contentType: 'Banner',
          modified: new Date('2020/01/01'),
          id: createUUID(),
        },
        {
          label: 'Final summer design',
          contentType: 'Hero',
          modified: new Date('2020/02/01'),
          id: createUUID(),
        },
        {
          label: 'An example of something great',
          contentType: 'Carousel',
          modified: new Date('2020/03/01'),
          id: createUUID(),
        },
        {
          label: 'First lawnmower',
          contentType: 'Slide',
          modified: new Date('2020/04/04'),
          id: createUUID(),
        },
      ],
      id: createUUID(),
    },
    {
      label: 'Lovely',
      color: 'purple',
      contentItems: [
        {
          label: 'Hero Banner',
          contentType: 'Banner',
          modified: new Date('2020/01/01'),
          id: createUUID(),
        },
        {
          label: 'Final summer design',
          contentType: 'Hero',
          modified: new Date('2020/02/01'),
          id: createUUID(),
        },
        {
          label: 'An example of something great',
          contentType: 'Carousel',
          modified: new Date('2020/03/01'),
          id: createUUID(),
        },
        {
          label: 'First lawnmower',
          contentType: 'Slide',
          modified: new Date('2020/04/04'),
          id: createUUID(),
        },
      ],
      id: createUUID(),
    },
    {
      label: 'Person',
      color: 'blue',
      contentItems: [
        {
          label: 'Hero Banner',
          contentType: 'Banner',
          modified: new Date('2020/01/01'),
          id: createUUID(),
        },
        {
          label: 'Final summer design',
          contentType: 'Hero',
          modified: new Date('2020/02/01'),
          id: createUUID(),
        },
        {
          label: 'An example of something great',
          contentType: 'Carousel',
          modified: new Date('2020/03/01'),
          id: createUUID(),
        },
        {
          label: 'First lawnmower',
          contentType: 'Slide',
          modified: new Date('2020/04/04'),
          id: createUUID(),
        },
      ],
      id: createUUID(),
    },
  ];

  function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function handleConsider(statusId: any, e: CustomEvent<DndEvent>) {
    const statusIndex = statuses.findIndex((status) => status.id == statusId);
    statuses[statusIndex].contentItems = e.detail.items;
  }
  function handleFinalize(statusId: any, e: CustomEvent<DndEvent>) {
    const statusIndex = statuses.findIndex((status) => status.id == statusId);
    statuses[statusIndex].contentItems = e.detail.items;
    console.log('Update DC via management SDK...');
  }

  onMount(() => {
    statuses = [...statusesTemplate];
  });
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

<Columns {statuses} {handleConsider} {handleFinalize} />
