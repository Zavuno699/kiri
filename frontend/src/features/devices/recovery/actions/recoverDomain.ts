import { recover } from "../../../application/recovery/runtime/recoveryRuntime";

export function recoverDevicesDomain(): boolean {
  return recover({
    scope: "resource",
    reason: "devices-resource-recovery",
    resourceType: "devices",
  });
}
