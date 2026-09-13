import {
  requireCapability,
} from "../../../application/security/guards/requireCapability";

export function requireLocksWrite(): void {
  requireCapability(
    "locks.write",
  );
}
