export interface ResourceState<T = unknown> {
  domain: string;
  resourceKey: string;
  data: T | null;
  status:
    | "idle"
    | "loading"
    | "ready"
    | "stale"
    | "error";
  version: number;
  updatedAt: string | null;
  error: string | null;
}
