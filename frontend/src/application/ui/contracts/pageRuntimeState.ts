export type PageRuntimeStatus =
  | "idle"
  | "loading"
  | "ready"
  | "stale"
  | "degraded"
  | "error";

export interface PageRuntimeState {
  domain: string;
  status: PageRuntimeStatus;
  lastLoadedAt: string | null;
  lastUpdatedAt: string | null;
  error: string | null;
}
