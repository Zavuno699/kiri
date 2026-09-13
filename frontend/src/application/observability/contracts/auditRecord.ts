export interface AuditRecord {
  id: string;
  category:
    | "command"
    | "event"
    | "projection"
    | "state"
    | "security"
    | "system";
  action: string;
  domain: string;
  entityId: string | null;
  actor: string;
  correlationId: string | null;
  causationId: string | null;
  outcome:
    | "success"
    | "blocked"
    | "failed"
    | "observed";
  message: string;
  occurredAt: string;
}
