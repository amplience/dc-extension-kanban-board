import { Hub } from 'dc-management-sdk-js';
import { writable } from 'svelte/store';

export const hub = writable<Hub>(new Hub());
