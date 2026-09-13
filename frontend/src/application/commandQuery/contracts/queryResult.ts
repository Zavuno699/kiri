export interface QueryResult<T = unknown> {
  queryId: string;
  success: boolean;
  data: T | null;
  message: string | null;
  durationMs: number;
}
