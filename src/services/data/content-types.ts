import { ContentType } from 'dc-management-sdk-js';
import type { DcExtensionClient } from '../dc-extension-client';

export interface ContentTypeLookup {
  [key: string]: ContentType;
}

export async function fetchAll({
  hub,
}: DcExtensionClient): Promise<ContentTypeLookup> {
  const data = await hub.related.contentTypes.list();
  return getLookupMap(data.getItems());
}

function getLookupMap(items: any[]) {
  const lookupMap = Object.create(null);
  items.forEach((item) => {
    lookupMap[item.contentTypeUri] = new ContentType(item);
  });
  return lookupMap;
}
