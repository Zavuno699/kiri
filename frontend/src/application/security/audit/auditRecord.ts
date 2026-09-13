
export interface SecurityAuditRecord {
  id: string;
  category:
    | "authentication"
    | "authorization"
    | "session"
    | "policy"
    | "credential"
    | "command"
    | "recovery";
  action: string;
  principal: string | null;
  outcome: "success" | "denied" | "failed" | "unknown";
  occurredAt: string;
  metadata?: Record<string, unknown>;
}

