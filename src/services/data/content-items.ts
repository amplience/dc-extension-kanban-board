import type { HttpResponse } from 'dc-extensions-sdk';
import type { DcClient } from '../dc-client';
  import {
    workflowStates,
  } from '../data';
import PromisePool from '@supercharge/promise-pool';
const defaultParams = { page: 0, sort: 'lastModifiedDate:desc',size: 20}
export async function fetchForStatuses(
  client: DcClient,
  hubId: string,
  statuses: string[],
  params: Record<string, any> 
): Promise<HttpResponse[]> {
  const { results } = await PromisePool.withConcurrency(5)
    .for(statuses)
    .process(async (status) => {
      const { data } = await fetchForStatus(client, hubId, status, { ...defaultParams, params });
      return data;
    });
  return results;
}

export async function fetchForStatus(
  client: DcClient,
  hubId: string,
  status: string,
  params: Record<string, unknown>
): Promise<HttpResponse> {
  return await client.post(
    `/hubs/${hubId}/content-items/facet`,
    {
      facetAs: 'ENUM',
      field: 'workflow.state',
      filter: { type: 'IN', values: [status] },
      name: 'workflow.state',
    },
    params
  );
}

export async function fetchHydratedStatuesWithContentItems(dcClient: DcClient,  hubId: string, statuses: string[], params: Record<string, unknown>) {
    const [
      hydratedStatuses,
      contentItemsByStatus,
    ] = await Promise.all([
        workflowStates.fetchAndHydrate(dcClient, hubId, statuses),
        fetchForStatuses(dcClient, hubId, statuses, params),
    ]);
  console.log(contentItemsByStatus)
    return hydratedStatuses.map((status, i) => {
      status.contentItems = contentItemsByStatus[i];
      return status;
    });
}
