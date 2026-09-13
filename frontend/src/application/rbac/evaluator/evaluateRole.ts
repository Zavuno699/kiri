import type { RoleKey } from "../types";
import { getRBACRole } from "../roles/roleRegistry";

export function roleGrantsCapability(
  role: RoleKey,
  capability: string,
): boolean {
  const definition = getRBACRole(role);

  if (!definition?.active) {
    return false;
  }

  return definition.capabilities.includes(capability);
}
