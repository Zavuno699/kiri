export type ProjectionRefreshResult = {
  domain: string;
  projection: string;
  entityId?: string;
  startedAt: string;
  completedAt: string;
  status: "refreshed" | "skipped" | "failed";
  previousVersion?: number;
  currentVersion?: number;
  error?: string;
};
