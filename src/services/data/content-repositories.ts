import type { ContentRepository, Folder } from 'dc-management-sdk-js';
import type { DcExtensionClient } from '../dc-extension-client';

export async function getContentItemPath(
  client: DcExtensionClient
): Promise<string> {
  const repository: any = (await fetchRepository(client)) || {};
  const folders: any = await fetchFolders(client);
  if (folders) {
    repository.child = folders;
  }
  return getPath(repository, new Path()).toString();
}

async function fetchRepository({
  dcClient,
  contentRepositoryId,
}: DcExtensionClient): Promise<ContentRepository | undefined> {
  if (!contentRepositoryId) {
    return;
  }
  return await dcClient.contentRepositories.get(contentRepositoryId);
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
): Promise<Folder> {
  if (!folderId) {
    throw new Error('Unable to get folder');
  }
  return await dcClient.folders.get(parentFolderId || folderId);
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

  toString(delimiter: string = ' / '): string {
    return this.parts.map(({ label }) => label).join(delimiter);
  }
}
