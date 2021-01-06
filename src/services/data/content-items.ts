import type Status from '../models/status';
import PromisePool from '@supercharge/promise-pool';
import type { DcExtensionClient } from '../dc-extension-client';
import { toDcQueryStr } from '../../utils';
import type {
  DateFacet,
  FacetedContentItem,
  FacetField,
  HalResource,
  Page,
  Pageable,
  Sortable,
} from 'dc-management-sdk-js';
import { DATE_FACET_LAST_7_DAYS } from '../models/facets';

const FACETS_DEFAULT_PARAMS = {
  page: 0,
  sort: 'lastModifiedDate,desc',
  size: 20,
};

export type StatusTotals = {
  [k: string]: number;
};

type ContentItemsWithStatusTotals = {
  contentItems: FacetedContentItem[];
  statusTotals: StatusTotals;
};

type ContentItemFetchOptions = Pageable &
  Sortable & {
    query: string;
  };

export async function fetchByStatusId(
  client: DcExtensionClient,
  ids: string | string[],
  facets: FacetField[]
): Promise<ContentItemsWithStatusTotals> {
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  const statusTotals: StatusTotals = {};
  const { results } = await PromisePool.withConcurrency(5)
    .for(ids)
    .process(async (id: string) => {
      const statusFacets: FacetField[] = [
        {
          facetAs: 'ENUM',
          field: 'workflow.state',
          filter: { type: 'IN', values: [id] },
          name: 'workflow.state',
        },
        ...facets,
      ];

      if (id === ids[ids.length - 1]) {
        const dateFacet: DateFacet = {
          facetAs: 'DATE',
          name: DATE_FACET_LAST_7_DAYS,
          field: 'lastModifiedDate',
          range: { start: 'NOW', end: '-7:DAYS' },
          filter: { type: 'DATE', values: ['-7:DAYS,NOW'] },
        };
        statusFacets.push(dateFacet);
      }
      const { contentItems, totalElements } = await fetch(client, statusFacets);
      statusTotals[id] = totalElements;
      return contentItems;
    });

  return { contentItems: results.flat(), statusTotals };
}

async function fetch(
  client: DcExtensionClient,
  facets: FacetField[],
  params?: ContentItemFetchOptions
): Promise<{ contentItems: FacetedContentItem[]; totalElements: number }> {
  let contentItems: FacetedContentItem[] = [];
  let totalElements = 0;
  try {
    const { hub, folderId, contentRepositoryId } = client;
    const response = await hub.related.contentItems.facet(
      {
        fields: facets || [],
        returnEntities: true,
      },
      {
        ...FACETS_DEFAULT_PARAMS,
        ...params,
        query: toDcQueryStr({
          status: 'ACTIVE',
          contentRepositoryId,
          folderId,
        }),
      }
    );
    contentItems = response.getItems();
    totalElements = response.page?.totalElements || 0;
  } finally {
    return { contentItems, totalElements };
  }
}

function getPagination(data: Page<HalResource>) {
  return (
    {
      ...data?.page,
      elementsInCurrentPage: data?.getItems().length,
    } || {}
  );
}
