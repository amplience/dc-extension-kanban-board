import type { DcClient } from '../dc-client';
import type Status from '../models/status';
import ContentItem from '../models/content-item';
import { workflowStates } from '../data';
import PromisePool from '@supercharge/promise-pool';
import type { InstallationParamsStatus } from '../dc-extension-client';

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
  statuses: Status[],
  params: Record<string, any>
): Promise<ContentItemCollection[]> {
  const { results } = await PromisePool.withConcurrency(5)
    .for(statuses)
    .process(
      async (status: Status) =>
        await fetchForStatus(client, hubId, status, params)
    );
  return results;
}

export async function fetchForStatus(
  client: DcClient,
  hubId: string,
  status: Status,
  params: Record<string, any>
): Promise<ContentItemCollection> {
  try {
    const { data } = await client.post(
      `/hubs/${hubId}/content-items/facet`,
      {
        fields: status.facets,
        returnEntities: true,
      },
      { ...FACETS_DEFAULT_PARAMS, ...params }
    );

    return {
      statusId: status.id,
      items: mapContentItems(data),
      page: getPagination(data),
    };
  } catch (error) {
    return {
      statusId: status.id,
      items: [],
      page: {},
    };
  }
}

export async function fetchHydrated(
  dcClient: DcClient,
  hubId: string,
  statuses: InstallationParamsStatus[],
  params: Record<string, unknown>
): Promise<StatusWithContentItemCollection[]> {
  const hydratedStatuses = await workflowStates.fetchAndHydrate(
    dcClient,
    hubId,
    statuses
  );
  const contentItemsByStatus = await fetchForStatuses(
    dcClient,
    hubId,
    hydratedStatuses,
    params
  );

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
