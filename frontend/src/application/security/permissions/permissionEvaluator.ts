
import type { CapabilityKey } from "./capabilityKeys";
import type { PermissionSet } from "./permissionSet";

export interface PermissionEvaluation {
  capability: CapabilityKey;
  allowed: boolean;
  reason: string;
}

export function evaluatePermission(
  permissions: PermissionSet | null,
  capability: CapabilityKey,
): PermissionEvaluation {
  if (!permissions) {
    return {
      capability,
      allowed: false,
      reason: "permissions-unavailable",
    };
  }

  if (permissions.denied.includes(capability)) {
    return {
      capability,
      allowed: false,
      reason: "explicitly-denied",
    };
  }

  if (!permissions.granted.includes(capability)) {
    return {
      capability,
      allowed: false,
      reason: "capability-not-granted",
    };
  }

  return {
    capability,
    allowed: true,
    reason: "granted",
  };
}

