import {
  requireCapability,
} from "../../../../security/guards/requireCapability";

export function guardSecurityLockAuthorization(): void {
  requireCapability(
    "locks.command",
  );
}
