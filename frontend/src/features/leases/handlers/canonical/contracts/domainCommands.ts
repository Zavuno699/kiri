export interface LeasesCommandPayload {
  domain: "leases";
  action?: string;
  resourceId?: string;
  data?: Record<string, unknown>;
}
