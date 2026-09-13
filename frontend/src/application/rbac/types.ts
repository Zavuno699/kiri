export type RoleKey =
  | "viewer"
  | "operator"
  | "manager"
  | "administrator"
  | "security-admin";

export type PermissionEffect =
  | "allow"
  | "deny";

export type PermissionScope =
  | "global"
  | "tenant"
  | "organization"
  | "resource";

export type PermissionLevel =
  | "read"
  | "write"
  | "command"
  | "review"
  | "admin";
