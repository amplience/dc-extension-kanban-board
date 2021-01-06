import type {
  DcExtensionClient,
  InstallationParamsStatus,
} from '../dc-extension-client';
import Status from '../models/status';

const getLastStatus = (statuses: Status[]) => statuses[statuses.length - 1];

export async function fetchAndHydrate(
  { statuses, hub }: DcExtensionClient,
  params: Record<string, any> = { size: 100 }
): Promise<Status[]> {
  const data = await hub.related.workflowStates.list();
  const hydratedStatuses = statuses.map(({ id }: InstallationParamsStatus) => {
    const foundStatus = data.getItems().find((status: any) => status.id === id);

    return new Status(foundStatus || { id });
  });
  return hydratedStatuses;
}
