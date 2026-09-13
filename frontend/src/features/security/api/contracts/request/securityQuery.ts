export interface SecurityQuery {
  id?: string;
  offset?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}
