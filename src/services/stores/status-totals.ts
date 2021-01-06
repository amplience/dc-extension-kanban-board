import { writable } from 'svelte/store';
import type { StatusTotals } from '../data/content-items';

function initTotals() {
  const { subscribe, set, update } = writable<StatusTotals>({});
  return {
    subscribe,
    set,
    update,
    decrementStatusTotals: (id: string) =>
      update((totals) => {
        totals[id] = totals[id] - 1;
        return totals;
      }),
    incrementStatusTotals: (id: string) =>
      update((totals) => {
        totals[id] = totals[id] + 1;
        return totals;
      }),
  };
}

export const totalsPerStatus = initTotals();
