import { DEFAULT_RBAC_ROLES } from "../roles/defaultRoles";
import { registerRBACRole } from "../roles/roleRegistry";

export function registerDefaultRBAC(): void {
  for (const role of DEFAULT_RBAC_ROLES) {
    registerRBACRole(role);
  }
}
