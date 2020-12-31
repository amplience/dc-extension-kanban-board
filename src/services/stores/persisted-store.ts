import { writable as svelteWritable, Writable } from 'svelte/store';

export const PREFIX = 'dc-dashboard-kanban.';

export function persistedWritable<T>(key: string, value: T): Writable<T> {
  const svelteStore = svelteWritable(value);

  const localStorageKey = `${PREFIX}${key}`;

  const newValue = sessionStorage.getItem(localStorageKey);
  if (newValue) {
    svelteStore.set(JSON.parse(newValue));
  }

  svelteStore.subscribe((value) => {
    sessionStorage.setItem(localStorageKey, JSON.stringify(value));
  });

  return svelteStore;
}
