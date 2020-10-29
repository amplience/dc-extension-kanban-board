import type { DcClient } from '../dc-client';
import type Status from '../models/status';
import ContentItem from '../models/content-item';
import PromisePool from '@supercharge/promise-pool';
import type { DcExtensionClient } from '../dc-extension-client';
import { toDcQueryStr } from '../../utils';

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
    const { dcClient, hubId, folderId, contentRepositoryId } = client;
    const { data } = await dcClient.post(
      `/hubs/${hubId}/content-items/facet`,
      {
        fields: status.facets,
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

export async function updateWorkflowStatus(
  client: DcClient,
  contentItem: ContentItem,
  workflowStatusId: string
): Promise<ContentItem> {
  const { data } = await client.patch(
    `/content-items/${contentItem.id}/workflow`,
    {
      version: contentItem.version,
      state: workflowStatusId,
    },
    {}
  );
  return new ContentItem(data);
}

function mapContentItems(data: any) {
  return (
    data?._embedded?.['content-items'].map(
      (item: any) => new ContentItem(item)
    ) || []
  );
}

function getPagination(data: any) {
  return (
    {
      ...data?.page,
      elementsInCurrentPage: data?._embedded?.['content-items'].length,
    } || {}
  );
}
