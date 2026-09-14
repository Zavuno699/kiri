
import { hasPermission } from "../permissions/permissionResolver";
import type { CapabilityKey } from "../permissions/capabilityKeys";
import { getSecurityRuntimeState } from "../runtime/securityRuntimeStore";

export function capabilityAllowed(
  capability: CapabilityKey,
): boolean {
  const state = getSecurityRuntimeState();

  if (!state.identity.authenticated) {
    return false;
  }

  if (!state.session.session) {
    return false;
  }

  if (state.frozen) {
    return false;
  }

  const permissionSet = state.permissions ? {
    granted: state.permissions as any,
    denied: [],
  } : null;
  
  return hasPermission(permissionSet, capability);
}

