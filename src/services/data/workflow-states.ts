import type { DcClient } from '../dc-client';
import type { InstallationParamsStatus } from '../dc-extension-client';
import Status from '../models/status';

const getLastStatus = (statuses: Status[]) => statuses[statuses.length - 1];

export async function fetchAndHydrate(
  client: DcClient,
  hubId: string,
  statuses: InstallationParamsStatus[],
  params: Record<string, unknown> = { size: 100 }
): Promise<Status[]> {
  const { data } = await client.get(`/hubs/${hubId}/workflow-states`, params);
  const hydratedStatuses = statuses
    .map(({ id }: InstallationParamsStatus) => {
      const foundStatus = (data as any)?._embedded['workflow-states'].find(
        (status: any) => status.id === id
      );

      return new Status(foundStatus || { id });
    })
    .filter((status: Status) => status.hydrated);

  const lastStatus = getLastStatus(hydratedStatuses);
  if (lastStatus) {
    lastStatus.addDateFacetField();
  }
  return hydratedStatuses;
}
