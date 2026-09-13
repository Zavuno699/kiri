export interface StateSlice<T = unknown> {
  key: string;
  domain: string;
  data: T;
  version: number;
  updatedAt: string | null;
}
