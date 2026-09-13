import type { RoleDefinition } from "./roleDefinition";
import type { RoleKey } from "../types";

const roles = new Map<RoleKey, RoleDefinition>();

export function registerRBACRole(
  role: RoleDefinition,
): void {
  roles.set(role.key, role);
}

export function getRBACRole(
  key: RoleKey,
): RoleDefinition | null {
  return roles.get(key) ?? null;
}

export function listRBACRoles(): RoleDefinition[] {
  return [...roles.values()];
}
