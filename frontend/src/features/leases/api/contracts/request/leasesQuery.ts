export interface LeasesQuery {
  id?: string;
  offset?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}
