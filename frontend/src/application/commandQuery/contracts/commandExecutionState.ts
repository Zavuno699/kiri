export interface CommandExecutionState {
  activeCommandId: string | null;
  entityId: string | null;
  status:
    | "idle"
    | "pending"
    | "accepted"
    | "blocked"
    | "failed"
    | "completed";
  message: string | null;
  correlationId: string | null;
  startedAt: string | null;
  completedAt: string | null;
}
