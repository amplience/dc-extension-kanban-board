import type { FacetedContentItem } from 'dc-management-sdk-js';
import { writable } from 'svelte/store';

export const contentItems = writable<FacetedContentItem[]>([]);

export const getByStatusId = (
  items: FacetedContentItem[],
  id: string
): FacetedContentItem[] => items.filter((item) => item?.workflow?.state === id);
