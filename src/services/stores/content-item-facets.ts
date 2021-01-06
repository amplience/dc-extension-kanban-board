import type { User } from 'dc-extensions-sdk/dist/types/lib/components/Users';
import type { FacetField } from 'dc-management-sdk-js';
import { derived } from 'svelte/store';
import { selectedAssignees } from './filters/selected-assignees';

export const contentItemFacets = derived(
  [selectedAssignees],
  ([$selectedAssignees]) => {
    const facets: FacetField[] = [];
    if ($selectedAssignees.length > 0) {
      facets.push(createAssigneeFacet($selectedAssignees));
    }
    return facets;
  }
);

function createAssigneeFacet(users: User[]): FacetField {
  return {
    facetAs: 'ENUM',
    field: 'assignees',
    filter: { type: 'IN', values: users.map((user) => user.id) },
    name: 'assignees',
  };
}
