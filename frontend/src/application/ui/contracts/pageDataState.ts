export interface PageDataState<T = unknown> {
  domain: string;
  data: T | null;
  loading: boolean;
  stale: boolean;
  error: string | null;
  version: number;
  updatedAt: string | null;
}
