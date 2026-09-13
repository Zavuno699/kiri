import {
  requireCapability,
} from "../requireCapability";

export function guardLockCommand(): void {
  requireCapability(
    "locks.command",
  );
}
