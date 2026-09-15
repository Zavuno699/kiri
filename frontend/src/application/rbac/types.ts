// Frontend RoleKey now matches authoritative backend roles from backend/security-service/internal/security/role.go
// Backend roles: tenant, landlord, service, device, operator, security_admin, super_admin
export type RoleKey =
  | "tenant"
  | "landlord"
  | "service"
  | "device"
  | "operator"
  | "security_admin"
  | "super_admin";

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
