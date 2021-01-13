import type {
  DcExtensionClient,
  InstallationParamsStatus,
} from '../dc-extension-client';
import Status from '../models/status';

export async function fetchAndHydrate({
  statuses,
  hub,
}: DcExtensionClient): Promise<Status[]> {
  const data = await hub.related.workflowStates.list();
  const hydratedStatuses = statuses.map(({ id }: InstallationParamsStatus) => {
    const foundStatus = data.getItems().find((status: any) => status.id === id);

    return new Status(foundStatus || { id });
  });
  return hydratedStatuses;
}
