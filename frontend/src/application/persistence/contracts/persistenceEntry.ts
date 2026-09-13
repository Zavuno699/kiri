export interface PersistenceEntry<T = unknown> {
  key: string;
  domain: string;
  resourceKey: string;
  data: T | null;
  status:
    | "empty"
    | "loading"
    | "ready"
    | "stale"
    | "error";
  version: number;
  cachedAt: string | null;
  expiresAt: string | null;
  error: string | null;
}
