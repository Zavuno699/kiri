import type { RoleKey } from "../types";
import { registerDefaultRBAC } from "./registerDefaultRBAC";
import { initializeRBAC } from "../state/rbacInitialization";

export function bootstrapRBAC(
  roles: RoleKey[],
): void {
  registerDefaultRBAC();
  initializeRBAC(roles);
}
