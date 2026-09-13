import { recover } from "../../../application/recovery/runtime/recoveryRuntime";

export function recoverSecurityDomain(): boolean {
  return recover({
    scope: "resource",
    reason: "security-resource-recovery",
    resourceType: "security",
  });
}
