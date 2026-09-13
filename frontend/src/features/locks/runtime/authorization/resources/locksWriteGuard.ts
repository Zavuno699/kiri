import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requireLocksResourceWrite(): void {
  requireCapability(
    "locks.write",
  );
}
