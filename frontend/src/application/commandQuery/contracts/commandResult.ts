export interface CommandResult<T = unknown> {
  commandId: string;
  accepted: boolean;
  status:
    | "accepted"
    | "rejected"
    | "blocked"
    | "failed"
    | "completed";
  message: string;
  data: T | null;
  correlationId: string;
}
