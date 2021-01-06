import type { FacetedContentItem } from 'dc-management-sdk-js';
import { writable } from 'svelte/store';

function initContentItems() {
  const { subscribe, set, update } = writable<FacetedContentItem[]>([]);

  let contentItems: FacetedContentItem[] = [];
  subscribe((items) => (contentItems = items));
  return {
    subscribe,
    set,
    update,
    getByStatusId: (id: string) =>
      contentItems.filter((item) => item?.workflow?.state === id),
  };
}

export const contentItems = initContentItems();
