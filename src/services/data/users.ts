import type { User } from 'dc-extensions-sdk/dist/types/lib/components/Users';
import type { DcExtensionClient } from '../dc-extension-client';

export async function fetchAll(client: DcExtensionClient): Promise<User[]> {
  return await client.dashboardSdk.users.list();
}
