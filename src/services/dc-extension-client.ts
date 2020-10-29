import { SDK, Options } from 'dc-extensions-sdk';
import { DcClient } from './dc-client';

export interface InstallationParamsStatus {
  id: string;
  [key: string]: any;
}

export class DcExtensionClient {
  public hubId!: string;
  public contentRepositoryId?: string | undefined;
  public folderId?: string | undefined;
  public statuses: InstallationParamsStatus[] = [];
  public dcClient!: DcClient;

  async init(options: Options): Promise<void> {
    const sdk: SDK = await new SDK(options).init();
    const {
      hubId,
      installation: { repositoryId, folderId, statuses = [] },
    } = sdk.params as any;

    if (!hubId) {
      throw new Error('Hub id required');
    }
    if (!repositoryId) {
      throw new Error('Repository id required');
    }

    this.hubId = hubId;
    this.contentRepositoryId = repositoryId;
    this.folderId = folderId;
    this.statuses = getUniqueStatuses(statuses);
    this.dcClient = new DcClient(sdk.client);
  }
}

export async function init(options: any): Promise<DcExtensionClient> {
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
