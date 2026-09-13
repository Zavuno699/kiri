import type { RoleKey } from "../types";
import { getRBACRole } from "../roles/roleRegistry";
import {
  getRBACState,
  setRBACState,
} from "./rbacStore";

export function initializeRBAC(
  roles: RoleKey[],
): void {
  const capabilities = new Set<string>();

  for (const role of roles) {
    const definition = getRBACRole(role);

    if (!definition?.active) {
      continue;
    }

    for (const capability of definition.capabilities) {
      capabilities.add(capability);
    }
  }

  setRBACState({
    ...getRBACState(),
    initialized: true,
    roles,
    effectiveCapabilities: [...capabilities],
    error: null,
  });
}
