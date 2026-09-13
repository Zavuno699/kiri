export interface ProjectionSnapshot {
  id: string;
  domain: string;
  capturedAt: string;
  entityIds: string[];
  projectionIds: string[];
  versions: Record<string, number>;
  staleEntityIds: string[];
  healthy: boolean;
}
