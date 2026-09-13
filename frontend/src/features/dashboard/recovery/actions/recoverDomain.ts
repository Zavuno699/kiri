import { recover } from "../../../application/recovery/runtime/recoveryRuntime";

export function recoverDashboardDomain(): boolean {
  return recover({
    scope: "resource",
    reason: "dashboard-resource-recovery",
    resourceType: "dashboard",
  });
}
