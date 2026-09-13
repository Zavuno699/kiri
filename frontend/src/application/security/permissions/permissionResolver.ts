
import type { CapabilityKey } from "./capabilityKeys";
import type { PermissionSet } from "./permissionSet";

export function hasPermission(
  permissions: PermissionSet | null | undefined,
  capability: CapabilityKey,
): boolean {
  if (!permissions) {
    return false;
  }

  if (permissions.denied.includes(capability)) {
    return false;
  }

  return permissions.granted.includes(capability);
}

