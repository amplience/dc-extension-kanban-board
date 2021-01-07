import { ContentItem, FacetedContentItem } from 'dc-management-sdk-js';
import { getByStatusId } from './content-items';

describe('contentItems - getByStatusId', () => {
  const contentItems = ([
    new ContentItem({ id: 'CONTENT_1', workflow: { state: 'ID' } }),
    new ContentItem({
      id: 'CONTENT_2',
      workflow: { state: 'DIFFERENT_ID' },
    }),
    new ContentItem({ id: 'CONTENT_3', workflow: { state: 'ID' } }),
  ] as unknown) as FacetedContentItem[];

  it('should fetch a list of content items', () => {
    expect(getByStatusId(contentItems, 'ID')).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "CONTENT_1",
          "workflow": Object {
            "state": "ID",
          },
        },
        Object {
          "id": "CONTENT_3",
          "workflow": Object {
            "state": "ID",
          },
        },
      ]
    `);
  });

  it('should fail to find content items', () => {
    expect(getByStatusId(contentItems, 'UNKNOWN_ID')).toMatchInlineSnapshot(
      `Array []`
    );
  });
});
