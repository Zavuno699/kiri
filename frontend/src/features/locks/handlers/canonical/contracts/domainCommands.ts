export interface LocksCommandPayload {
  domain: "locks";
  action?: string;
  resourceId?: string;
  data?: Record<string, unknown>;
}
