import { persistedWritable } from '../persisted-store';

export const selectedAssignees = persistedWritable<string[]>(
  'selectedAssignees',
  []
);
