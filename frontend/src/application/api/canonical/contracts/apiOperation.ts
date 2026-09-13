export type ApiOperation =
  | "list"
  | "get"
  | "create"
  | "update"
  | "delete"
  | "command"
  | "action"
  | "status";

export interface ApiOperationContract {
  key: string;
  domain: string;
  operation: ApiOperation;
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  authenticated: boolean;
  capability?: string;
}
