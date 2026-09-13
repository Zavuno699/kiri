import { recover } from "../../../application/recovery/runtime/recoveryRuntime";

export function recoverLeasesDomain(): boolean {
  return recover({
    scope: "resource",
    reason: "leases-resource-recovery",
    resourceType: "leases",
  });
}
