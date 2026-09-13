import type { RoleKey } from "../types";
import { roleGrantsCapability } from "./evaluateRole";

export function anyRoleGrantsCapability(
  roles: RoleKey[],
  capability: string,
): boolean {
  return roles.some((role) =>
    roleGrantsCapability(role, capability),
  );
}
