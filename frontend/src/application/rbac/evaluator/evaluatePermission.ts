import type { RoleKey } from "../types";
import { anyRoleGrantsCapability } from "./evaluateRoles";
import { getRBACCapability } from "../capabilities/capabilityRegistry";

export interface RBACDecision {
  allowed: boolean;
  capability: string;
  dangerous: boolean;
  mutating: boolean;
  reason: string;
}

export function evaluateRBACPermission(
  roles: RoleKey[],
  capability: string,
): RBACDecision {
  const definition = getRBACCapability(capability);

  if (!definition || !definition.active) {
    return {
      allowed: false,
      capability,
      dangerous: false,
      mutating: false,
      reason: "unknown-capability",
    };
  }

  if (!anyRoleGrantsCapability(roles, capability)) {
    return {
      allowed: false,
      capability,
      dangerous: definition.dangerous,
      mutating: definition.mutating,
      reason: "role-does-not-grant-capability",
    };
  }

  return {
    allowed: true,
    capability,
    dangerous: definition.dangerous,
    mutating: definition.mutating,
    reason: "role-capability-granted",
  };
}
