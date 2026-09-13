export interface LeasesAuditEvent {
  domain: "leases";
  action: string;
  outcome: string;
  occurredAt: string;
  principal: string | null;
  resourceId: string | null;
}
