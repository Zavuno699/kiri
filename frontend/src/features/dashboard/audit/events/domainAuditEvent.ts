export interface DashboardAuditEvent {
  domain: "dashboard";
  action: string;
  outcome: string;
  occurredAt: string;
  principal: string | null;
  resourceId: string | null;
}
