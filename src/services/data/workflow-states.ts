import type { ContentItemCollection } from './content-items';
import type {
  DcExtensionClient,
  InstallationParamsStatus,
} from '../dc-extension-client';
import Status from '../models/status';
import { contentItems } from '../data';

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

  const lastStatus = getLastStatus(hydratedStatuses);
  if (lastStatus) {
    lastStatus.addDateFacetField();
  }
  return hydratedStatuses;
}

export async function fetchAndHydrateWithContentItems(
  client: DcExtensionClient,
  params: Record<string, any> = {}
): Promise<Status[]> {
  const hydratedStatuses = await fetchAndHydrate(client);
  const contentItemsByStatus = await contentItems.fetchForStatuses(
    client,
    hydratedStatuses,
    params
  );

  return hydratedStatuses.map((status: Status) => {
    const collection = contentItemsByStatus.find(
      (collection: ContentItemCollection) => collection.statusId === status.id
    );
    if (collection) {
      status.contentItems = collection;
    }
    return status;
  });
}

export function getContentItemsCount(statuses: Status[]): number {
  return statuses.reduce((p, c) => p + c.contentItems.items.length, 0);
}
