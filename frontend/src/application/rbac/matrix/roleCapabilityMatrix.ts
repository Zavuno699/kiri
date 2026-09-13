import type { RoleKey } from "../types";
import { getRBACRole } from "../roles/roleRegistry";

export interface RoleCapabilityMatrix {
  role: RoleKey;
  capabilities: string[];
}

export function resolveRoleCapabilityMatrix(
  role: RoleKey,
): RoleCapabilityMatrix {
  const definition = getRBACRole(role);

  return {
    role,
    capabilities: definition?.capabilities ?? [],
  };
}
