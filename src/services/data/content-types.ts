import type { DcExtensionClient } from '../dc-extension-client';
import ContentType from '../models/content-type';

export interface ContentTypeLookup {
  [key: string]: ContentType;
}

export async function fetchAll({
  dcClient,
  hubId,
}: DcExtensionClient): Promise<ContentTypeLookup> {
  const { data } = await dcClient.getAll(
    'content-types',
    `/hubs/${hubId}/content-types`
  );

  return getLookupMap(data.items);
}

function getLookupMap(items: any[]) {
  const lookupMap = Object.create(null);
  items.forEach((item) => {
    lookupMap[item.contentTypeUri] = new ContentType(item);
  });
  return lookupMap;
}
