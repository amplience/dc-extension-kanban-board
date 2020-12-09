import type Status from '../models/status';
import PromisePool from '@supercharge/promise-pool';
import type { DcExtensionClient } from '../dc-extension-client';
import { toDcQueryStr } from '../../utils';
import type { FacetedContentItem, HalResource, Page } from 'dc-management-sdk-js';

const FACETS_DEFAULT_PARAMS = {
  page: 0,
  sort: 'lastModifiedDate,desc',
  size: 20,
};

export interface ContentItemCollection {
  statusId: string;
  page: Record<string, any>;
  items: FacetedContentItem[] | [];
}

export async function fetchForStatuses(
  client: DcExtensionClient,
  statuses: Status[],
  params: Record<string, any>
): Promise<ContentItemCollection[]> {
  const { results } = await PromisePool.withConcurrency(5)
    .for(statuses)
    .process(
      async (status: Status) => await fetchForStatus(client, status, params)
    );
  return results;
}

export async function fetchForStatus(
  client: DcExtensionClient,
  status: Status,
  params: Record<string, any>
): Promise<ContentItemCollection> {
  try {
    if (!status.hydrated) {
      return status.contentItems;
    }
    const { hub, folderId, contentRepositoryId } = client;
    const response = await hub.related.contentItems.facet(
      {
        fields: status.facets || [],
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

    return {
      statusId: status.id,
      items: response.getItems(),
      page: getPagination(response),
    };
  } catch (error) {
    return {
      statusId: status.id,
      items: [],
      page: {},
    };
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
