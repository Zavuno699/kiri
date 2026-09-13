export interface EntityState {
  entityId: string;
  domain: string;
  state: string;
  version: number;
  updatedAt: string;
  metadata: Record<string, unknown>;
}
