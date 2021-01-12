import { contentItemFacets, createAssigneeFacet } from './content-item-facets';
import { selectedAssignees } from './filters/selected-assignees';

const users = ['USER_1', 'USER_2', 'USER_3'];

describe('content-item-facets - store value', () => {
  it('should build an array of facets', () => {
    selectedAssignees.set(users);

    contentItemFacets.subscribe((facets) => {
      expect(facets).toMatchSnapshot();
    });
  });

  it('should build an array of facets without assignees', () => {
    selectedAssignees.set([]);

    contentItemFacets.subscribe((facets) => {
      expect(facets).toMatchInlineSnapshot(`Array []`);
    });
  });
});

describe('content-item-facets - createAssigneeFacet', () => {
  it('should return an assignee facet', () => {
    expect(createAssigneeFacet(users)).toMatchInlineSnapshot(`
      Object {
        "facetAs": "ENUM",
        "field": "assignees",
        "filter": Object {
          "type": "IN",
          "values": Array [
            "USER_1",
            "USER_2",
            "USER_3",
          ],
        },
        "name": "assignees",
      }
    `);
  });
});
