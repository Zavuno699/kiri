export interface DevicesQuery {
  id?: string;
  offset?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}
