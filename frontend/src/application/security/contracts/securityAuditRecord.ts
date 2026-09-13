export interface SecurityAuditRecord {
  id: string;
  action: string;
  decision:
    | "allow"
    | "deny"
    | "challenge"
    | "freeze";
  principal: string | null;
  sessionId: string | null;
  capability: string | null;
  reason: string;
  occurredAt: string;
}
