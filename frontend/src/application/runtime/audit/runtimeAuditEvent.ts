export interface RuntimeAuditEvent {
  id: string;
  operation: string;
  outcome:
    | "accepted"
    | "completed"
    | "rejected"
    | "degraded";
  occurredAt: string;
  reason: string | null;
}
