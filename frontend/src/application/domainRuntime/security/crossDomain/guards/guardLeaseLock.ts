import {
  requireCapability,
} from "../../../../security/guards/requireCapability";

export function guardLeaseLockAuthorization(): void {
  requireCapability(
    "locks.command",
  );
}
