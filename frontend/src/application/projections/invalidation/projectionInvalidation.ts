export type ProjectionInvalidationReason =
  | "source-event"
  | "version-gap"
  | "stale"
  | "diverged"
  | "manual"
  | "dependency-change";

export type ProjectionInvalidation = {
  domain: string;
  projection: string;
  entityId?: string;
  reason: ProjectionInvalidationReason;
  occurredAt: string;
  correlationId?: string;
};
