import { render } from '@testing-library/svelte';
import Columns from './Columns.svelte';

describe('columns component', () => {
  it('should render a columns component', () => {
    const handleConsider = jest.fn();
    const handleFinalize = jest.fn();
    const client = {
      dashboardSdk: {
        applicationNavigator: {
          openContentItem: jest.fn(),
        },
      },
    };

    const { container } = render(Columns, {
      handleConsider,
      handleFinalize,
      statuses: [
        {
          id: 'ID',
          backgroundColor: 'RED',
          color: 'BLUE',
          label: 'STATUS_LABEL',
          hydrated: true,
          contentItems: {
            page: {},
            statusId: 'STATUS_ID',
            items: [
              {
                id: 'ID',
                label: 'LABEL',
                schema: 'schema',
                lastModifiedDate: '2020-01-01T00:00:59Z',
              },
            ],
            totalElements: 1,
          },
        },
      ],
      client: client,
      contentTypeLookup: {
        schema: {
          settings: {
            label: 'SCHEMA LABEL',
          },
        },
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
