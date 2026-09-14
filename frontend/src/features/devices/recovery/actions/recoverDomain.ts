import { recover } from "../../../../application/recovery/runtime/recoveryRuntime";

export function recoverDevicesDomain(): boolean {
  return recover("devices").recovered;
}
