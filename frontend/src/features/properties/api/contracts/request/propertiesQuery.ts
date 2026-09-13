export interface PropertiesQuery {
  id?: string;
  offset?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}
