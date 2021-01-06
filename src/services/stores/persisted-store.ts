import { writable as svelteWritable, Writable } from 'svelte/store';
import { hub } from './hub';

export const PREFIX = 'dc-dashboard-kanban.';

export function persistedWritable<T>(key: string, value: T): Writable<T> {
  const svelteStore = svelteWritable(value);

  hub.subscribe((selectedHub) => {
    if (selectedHub.name === undefined) {
      return;
    }

    const localStorageKey = `${PREFIX}${selectedHub?.name}-${key}`;

    const newValue = sessionStorage.getItem(localStorageKey);
    if (newValue) {
      svelteStore.set(JSON.parse(newValue));
    }

    svelteStore.subscribe((value) => {
      sessionStorage.setItem(localStorageKey, JSON.stringify(value));
    });
  });
  return svelteStore;
}
