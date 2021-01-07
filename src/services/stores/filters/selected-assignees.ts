import type { User } from 'dc-extensions-sdk/dist/types/lib/components/Users';
import { persistedWritable } from '../persisted-store';

export const selectedAssignees = persistedWritable<string[]>(
  'selectedAssignees',
  []
);
