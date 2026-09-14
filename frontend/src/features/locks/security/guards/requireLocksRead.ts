import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export function requireLocksRead(): void {
  requireCapability(
    "locks.read",
  );
}
