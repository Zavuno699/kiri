export interface PaymentsAuditEvent {
  domain: "payments";
  action: string;
  outcome: string;
  occurredAt: string;
  principal: string | null;
  resourceId: string | null;
}
