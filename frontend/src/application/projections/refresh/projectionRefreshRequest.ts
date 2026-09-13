export type ProjectionRefreshRequest = {
  domain: string;
  projection: string;
  entityId?: string;
  reason:
    | "initialization"
    | "invalidation"
    | "stale"
    | "diverged"
    | "manual"
    | "dependency";
  requestedAt: string;
  correlationId?: string;
};
