import type { RecoveryScope } from "../recoveryTypes";
import {
  RECOVERY_POLICIES,
} from "./recoveryPolicy";

export function getRecoveryPolicy(
  scope: RecoveryScope,
) {
  return (
    RECOVERY_POLICIES.find(
      (policy) => policy.scope === scope,
    ) ?? null
  );
}
