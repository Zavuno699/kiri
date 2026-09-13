
import type { CapabilityKey } from "../permissions/capabilityKeys";
import { mutationAllowed } from "./mutationGuard";

export function dangerousCommandAllowed(
  capability: CapabilityKey,
): boolean {
  return mutationAllowed(capability);
}

