import {
  init,
  InitOptions,
  DashboardExtension,
  Params,
} from 'dc-extensions-sdk';
import { DynamicContent, Hub } from 'dc-management-sdk-js';

export interface InstallationParamsStatus {
  id: string;
  [key: string]: any;
}

interface DashboardInstallationParams extends Params {
  installation: {
    repositoryId: string;
    folderId: string;
    statuses: InstallationParamsStatus[];
  };
}

export class DcExtensionClient {
  public dcAppHost!: string;
  public contentRepositoryId!: string;
  public folderId?: string | undefined;
  public statuses: InstallationParamsStatus[] = [];
  public dcClient!: DynamicContent;
  public hub!: Hub;
  public dashboardSdk!: DashboardExtension<DashboardInstallationParams>;

  async init(options: Partial<InitOptions>): Promise<void> {
    this.dashboardSdk = await init(
      options
    );
    this.dcClient = new DynamicContent({}, {}, this.dashboardSdk.client);

    const {
      hubId,
      params: {
        installation: { repositoryId, folderId, statuses = [] },
      },
    } = this.dashboardSdk;

    if (!hubId) {
      throw new Error('Hub id required');
    }

    this.contentRepositoryId = repositoryId;
    this.folderId = folderId;
    this.statuses = getUniqueStatuses(statuses);
    this.hub = await this.dcClient.hubs.get(hubId);
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
