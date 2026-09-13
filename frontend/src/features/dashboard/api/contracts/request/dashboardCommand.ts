export interface DashboardCommand {
  action:
    | "create"
    | "update"
    | "delete"
    | "command";
  resourceId?: string;
  payload:
    Record<string, unknown>;
}
