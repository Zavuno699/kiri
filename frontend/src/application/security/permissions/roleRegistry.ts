
import type { SecurityRole } from "./role";

const roles = new Map<string, SecurityRole>();

export function registerRole(role: SecurityRole): void {
  roles.set(role.key, role);
}

export function getRole(key: string): SecurityRole | null {
  return roles.get(key) ?? null;
}

export function listRoles(): SecurityRole[] {
  return [...roles.values()];
}

