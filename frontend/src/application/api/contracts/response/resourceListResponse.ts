export interface ResourceListResponse<T = unknown> {
  items: T[];
  total: number | null;
}
