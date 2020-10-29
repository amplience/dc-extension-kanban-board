import { isObject } from 'src/utils';
import type { DcExtensionClient } from '../dc-extension-client';
import ContentType from '../models/content-type';

export interface ContentTypeLookup {
  [key: string]: ContentType;
}

export async function getContentItemPath(
  client: DcExtensionClient
): Promise<PathPart[]> {
  const repository: any = await fetchRepository(client);
  const folders: any = await fetchFolders(client);
  if (folders) {
    repository.child = folders;
  }
  return getPath(repository, new Path()).toString();
}

async function fetchRepository({
  dcClient,
  contentRepositoryId,
}: DcExtensionClient): Promise<any> {
  const { data: repository } = await dcClient.get(
    `/content-repositories/${contentRepositoryId}`
  );

  if (!repository) {
    throw new Error('Unable to get repository');
  }

  return repository;
}

async function fetchFolders(client: DcExtensionClient): Promise<any> {
  if (!client.folderId) {
    return;
  }
  const recursiveGetParent = async (child: any): Promise<any> => {
    const parent = child._links['parent-folder'];
    if (!parent) {
      return child;
    }
    const folder: any = await fetchFolder(client, parent.href.split('/').pop());
    folder.child = child;
    return await recursiveGetParent(folder);
  };
  const folder = await fetchFolder(client);
  return await recursiveGetParent(folder);
}

async function fetchFolder(
  { dcClient, folderId }: DcExtensionClient,
  parentFolderId?: string
): Promise<any> {
  const { data: folder } = await dcClient.get(
    `/folders/${parentFolderId || folderId}`
  );

  if (!folderId) {
    throw new Error('Unable to get folder');
  }

  return folder;
}

function getPath(tree: any, path: Path): Path {
  path.addPart(new PathPart(tree));
  if (!tree.child) {
    return path;
  }

  return getPath(tree.child, path);
}

class PathPart {
  public id: string;
  public label: string;
  constructor({ id, label, name }: any) {
    this.id = id;
    this.label = label || name;
  }
}

class Path {
  private parts: PathPart[] = [];

  addPart(part: PathPart) {
    this.parts.push(part);
  }

  toString(delimiter: string = ' / ') {
    return this.parts.map(({ label }) => label).join(delimiter);
  }
}
