import { init, SDK, Options } from 'dc-extensions-sdk';
import { DcClient } from './dc-client';

export interface InstallationParamsStatus {
  id: string;
  [key: string]: any;
}

export class DcExtensionClient {
  public hubId!: string;
  public dcAppHost!: string;
  public contentRepositoryId!: string;
  public folderId?: string | undefined;
  public statuses: InstallationParamsStatus[] = [];
  public dcClient!: DcClient;

  async init(options: Options): Promise<void> {
    const sdk: SDK = await init(options);
    const {
      hubId,
      locationHref,
      installation: { repositoryId, folderId, statuses = [] },
    } = sdk.params as any;

    if (!hubId) {
      throw new Error('Hub id required');
    }

    if (!locationHref) {
      throw new Error('Location href required');
    }

    if (!repositoryId) {
      throw new Error('Repository id required');
    }

    this.hubId = hubId;
    this.contentRepositoryId = repositoryId;
    this.folderId = folderId;
    this.statuses = getUniqueStatuses(statuses);
    this.dcAppHost = getDcAppHostFromLocationHref(locationHref);
    this.dcClient = new DcClient(sdk.client);
  }
}

export async function initDcExtensionClient(
  options: any = {}
): Promise<DcExtensionClient> {
  const client = new DcExtensionClient();
  await client.init(options);
  return client;
}

interface StatusesMap {
  [key: string]: InstallationParamsStatus;
}

function getUniqueStatuses(
  statuses: InstallationParamsStatus[]
): InstallationParamsStatus[] {
  const statusesMap: StatusesMap = {};
  statuses.forEach((status: InstallationParamsStatus) => {
    statusesMap[status.id] = status;
  });
  return Object.values(statusesMap);
}

function getDcAppHostFromLocationHref(locationHref: string): string {
  return locationHref.split('/dashboard')[0];
}
