import { recover } from "../../../../application/recovery/runtime/recoveryRuntime";

export function recoverDashboardDomain(): boolean {
  return recover("dashboard").recovered;
}
