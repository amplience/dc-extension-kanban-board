import type { DcClient } from '../dc-client';
import type { Status } from './workflow-states';
import { workflowStates } from '../data';
import ContentItem from '../models/content-item';
import PromisePool from '@supercharge/promise-pool';

const FACETS_DEFAULT_PARAMS = {
  page: 0,
  sort: 'lastModifiedDate,desc',
  size: 20,
};

export interface ContentItemCollection {
  statusId: string;
  page: Record<string, any>;
  items: ContentItem[] | [];
}

export interface StatusWithContentItemCollection extends Status {
  contentItems: ContentItemCollection;
}

export type StatusesWithContentItemCollection = StatusWithContentItemCollection[];

export async function fetchForStatuses(
  client: DcClient,
  hubId: string,
  statuses: string[],
  params: Record<string, any>
): Promise<ContentItemCollection[]> {
  const { results } = await PromisePool.withConcurrency(5)
    .for(statuses)
    .process(
      async (statusId: string) =>
        await fetchForStatus(client, hubId, statusId, params)
    );
  return results;
}

export async function fetchForStatus(
  client: DcClient,
  hubId: string,
  statusId: string,
  params: Record<string, any>
): Promise<ContentItemCollection> {
  try {
    const { data } = await client.post(
      `/hubs/${hubId}/content-items/facet`,
      {
        fields: [
          {
            facetAs: 'ENUM',
            field: 'workflow.state',
            filter: { type: 'IN', values: [statusId] },
            name: 'workflow.state',
          },
        ],
        returnEntities: true,
      },
      { ...FACETS_DEFAULT_PARAMS, ...params }
    );

    return {
      statusId,
      items: mapContentItems(data),
      page: getPagination(data),
    };
  } catch (error) {
    return {
      statusId,
      items: [],
      page: {},
    };
  }
}

export async function fetchHydrated(
  dcClient: DcClient,
  hubId: string,
  statuses: string[],
  params: Record<string, unknown>
): Promise<StatusWithContentItemCollection[]> {
  const [hydratedStatuses, contentItemsByStatus] = await Promise.all([
    workflowStates.fetchAndHydrate(dcClient, hubId, statuses),
    fetchForStatuses(dcClient, hubId, statuses, params),
  ]);

  const result = hydratedStatuses.map((status: Status) => {
    return {
      ...status,
      contentItems: findContentItemCollectionForStatus(
        contentItemsByStatus,
        status.id
      ),
    } as StatusWithContentItemCollection;
  });
  console.log(result);

  return result;
}

export function updateWorkflowStatus(
  dcClient: DcClient,
  contentItemId: string,
  workflowStatusId: string
) {
  console.log(
    'in updateworkflowstatus',
    dcClient,
    contentItemId,
    workflowStatusId
  );
}

function findContentItemCollectionForStatus(
  collections: ContentItemCollection[],
  statusId: string
): ContentItemCollection {
  return (
    collections.find(
      (collection: ContentItemCollection) => collection.statusId === statusId
    ) || {
      statusId,
      items: [],
      page: {},
    }
  );
}

function mapContentItems(data: any) {
  return (
    data?._embedded?.['content-items'].map(
      (item: any) => new ContentItem(item)
    ) || []
  );
}

function getPagination(data: any) {
  return data?.page || {};
}
