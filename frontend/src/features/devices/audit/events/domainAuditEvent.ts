export interface DevicesAuditEvent {
  domain: "devices";
  action: string;
  outcome: string;
  occurredAt: string;
  principal: string | null;
  resourceId: string | null;
}
