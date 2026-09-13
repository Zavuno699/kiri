export interface LocksQuery {
  id?: string;
  offset?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}
