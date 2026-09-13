import { securityAdminPermission } from "./securityAdminPermission";

export function canAdministerSecurity(): boolean {
  return securityAdminPermission().allowed;
}
