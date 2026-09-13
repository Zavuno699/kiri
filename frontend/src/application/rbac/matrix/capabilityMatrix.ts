import { listRBACCapabilities } from "../capabilities/capabilityRegistry";
import { getRBACRole } from "../roles/roleRegistry";
import type { RoleKey } from "../types";

export interface CapabilityMatrixCell {
  role: RoleKey;
  capability: string;
  allowed: boolean;
}

export function buildCapabilityMatrix(
  roles: RoleKey[],
): CapabilityMatrixCell[] {
  const capabilities = listRBACCapabilities();

  return roles.flatMap((role) => {
    const definition = getRBACRole(role);

    return capabilities.map((capability) => ({
      role,
      capability: capability.key,
      allowed:
        Boolean(definition?.active) &&
        Boolean(definition?.capabilities.includes(capability.key)),
    }));
  });
}
