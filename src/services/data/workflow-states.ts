import type { DcClient } from '../dc-client';
import Status from '../models/status';

export async function fetchAndHydrate(
  client: DcClient,
  hubId: string,
  statuses: string[],
  params: Record<string, unknown> = { size: 100 }
): Promise<Status[]> {
  const { data } = await client.get(`/hubs/${hubId}/workflow-states`, params);
  const getLastStatus = (statuses: Status[]) => statuses[statuses.length - 1];
  const hydratedStatuses = statuses
    .map((id: string) => {
      const found = (data as any)?._embedded['workflow-states'].find(
        (status: any) => status.id === id
      );

      return new Status(found || { id });
    })
    .filter((status: Status) => status.hydrated);
  getLastStatus(hydratedStatuses).addDateFacetField();
  return hydratedStatuses;
}
