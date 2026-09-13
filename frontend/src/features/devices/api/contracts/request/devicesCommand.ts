export interface DevicesCommand {
  action:
    | "create"
    | "update"
    | "delete"
    | "command";
  resourceId?: string;
  payload:
    Record<string, unknown>;
}
