
import type { CapabilityKey } from "../permissions/capabilityKeys";
import { capabilityAllowed } from "./authorizationGuard";

export function mutationAllowed(
  capability: CapabilityKey,
): boolean {
  return capabilityAllowed(capability);
}

