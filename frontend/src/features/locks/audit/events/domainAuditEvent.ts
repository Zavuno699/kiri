export interface LocksAuditEvent {
  domain: "locks";
  action: string;
  outcome: string;
  occurredAt: string;
  principal: string | null;
  resourceId: string | null;
}
