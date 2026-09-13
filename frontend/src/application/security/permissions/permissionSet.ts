
import type { CapabilityKey } from "./capabilityKeys";

export interface PermissionSet {
  granted: CapabilityKey[];
  denied: CapabilityKey[];
}

