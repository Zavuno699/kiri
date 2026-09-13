export interface PaymentsCommand {
  action:
    | "create"
    | "update"
    | "delete"
    | "command";
  resourceId?: string;
  payload:
    Record<string, unknown>;
}
