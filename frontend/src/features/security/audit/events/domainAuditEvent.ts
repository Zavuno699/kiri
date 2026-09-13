export interface SecurityAuditEvent {
  domain: "security";
  action: string;
  outcome: string;
  occurredAt: string;
  principal: string | null;
  resourceId: string | null;
}
