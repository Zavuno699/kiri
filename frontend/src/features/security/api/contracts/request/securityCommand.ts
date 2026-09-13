export interface SecurityCommand {
  action:
    | "create"
    | "update"
    | "delete"
    | "command";
  resourceId?: string;
  payload:
    Record<string, unknown>;
}
