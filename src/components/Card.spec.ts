import { render } from '@testing-library/svelte';
import Card from './Card.svelte';
import { formatDate } from '../utils';

jest.mock('../utils');
describe('card component', () => {
  it('should render a card component', () => {
    (formatDate as jest.Mock).mockImplementation(() => '01/01/2020 12:00 AM');
    const client = {
      dashboardSdk: {
        applicationNavigator: {
          openContentItem: jest.fn(),
        },
      },
    };

    const { container } = render(Card, {
      contentItem: {
        label: 'LABEL',
        schema: 'schema',
        lastModifiedDate: '2020-01-01T00:00:59Z',
      },
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
