import type { User } from 'dc-extensions-sdk/dist/types/lib/components/Users';
import { writable } from 'svelte/store';

export const users = writable<User[]>([]);
