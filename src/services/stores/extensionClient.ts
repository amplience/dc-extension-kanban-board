import { writable } from 'svelte/store';
import { DcExtensionClient } from '../dc-extension-client';

export const extensionClient = writable<DcExtensionClient>(
  new DcExtensionClient()
);
