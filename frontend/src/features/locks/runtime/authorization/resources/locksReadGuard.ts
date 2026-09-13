import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requireLocksResourceRead(): void {
  requireCapability(
    "locks.read",
  );
}
