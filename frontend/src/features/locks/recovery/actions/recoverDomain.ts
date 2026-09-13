import { recover } from "../../../application/recovery/runtime/recoveryRuntime";

export function recoverLocksDomain(): boolean {
  return recover({
    scope: "resource",
    reason: "locks-resource-recovery",
    resourceType: "locks",
  });
}
