import { writable } from 'svelte/store';

export type Gravatars = Map<string, string | null>;

export const gravatars = writable<Gravatars>(new Map());
