export interface MaterializedEntity<T = Record<string, unknown>> {
  id: string;
  domain: string;
  entityType: string;
  version: number;
  sourceEventId: string | null;
  sourceEventType: string | null;
  updatedAt: string;
  stale: boolean;
  data: T;
}
