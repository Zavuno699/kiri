import {
  requireCapability,
} from "../../../../security/guards/requireCapability";

export function guardSecurityRecoveryAuthorization(): void {
  requireCapability(
    "recovery.execute",
  );
}
