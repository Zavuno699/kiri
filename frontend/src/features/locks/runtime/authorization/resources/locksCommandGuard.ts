import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requireLocksResourceCommand(): void {
  requireCapability(
    "locks.command",
  );
}
