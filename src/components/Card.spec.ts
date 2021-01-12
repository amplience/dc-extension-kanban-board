import { render, fireEvent } from '@testing-library/svelte';
import { screen } from '@testing-library/dom';
import Card from './Card.svelte';
import { formatDate } from '../utils';
import { extensionClient } from '../services/stores/extensionClient';
import type { DcExtensionClient } from '../services/dc-extension-client';
import { get } from 'svelte/store';

jest.mock('../utils');
describe('card component', () => {
  it('should render a card component', () => {
    (formatDate as jest.Mock).mockImplementation(() => '01/01/2020 12:00 AM');

    extensionClient.set(({
      dashboardSdk: {
        applicationNavigator: {
          openContentItem: jest.fn(),
        },
      },
    } as unknown) as DcExtensionClient);

    const { container } = render(Card, {
      contentItem: {
        label: 'LABEL',
        schema: 'schema',
        lastModifiedDate: '2020-01-01T00:00:59Z',
      },
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
    extensionClient.set(({
      dashboardSdk: {
        applicationNavigator: {
          openContentItem: jest.fn(),
        },
      },
    } as unknown) as DcExtensionClient);
    render(Card, {
      contentItem: {
        label: 'LABEL',
        schema: 'schema',
        lastModifiedDate: '2020-01-01T00:00:59Z',
      },
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
    expect(
      (get(extensionClient).dashboardSdk.applicationNavigator
        .openContentItem as jest.Mock).mock.calls
    ).toMatchInlineSnapshot(`
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
