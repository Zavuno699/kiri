export interface ResourceQueryRequest {
  id?: string;
  offset?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}
