import { render, fireEvent } from '@testing-library/svelte';
import { screen } from '@testing-library/dom';
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

  it('should call open content item function on load and double click', async () => {
    const client = {
      dashboardSdk: {
        applicationNavigator: {
          openContentItem: jest.fn(),
        },
      },
    };
    render(Card, {
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
    const element = screen.getByTestId('card');
    await fireEvent(
      element,
      new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(client.dashboardSdk.applicationNavigator.openContentItem.mock.calls)
      .toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "label": "LABEL",
            "lastModifiedDate": "2020-01-01T00:00:59Z",
            "schema": "schema",
          },
          Object {
            "returnHref": true,
          },
        ],
        Array [
          Object {
            "label": "LABEL",
            "lastModifiedDate": "2020-01-01T00:00:59Z",
            "schema": "schema",
          },
        ],
      ]
    `);
  });
});
