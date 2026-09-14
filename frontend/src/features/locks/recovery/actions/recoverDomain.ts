import { recover } from "../../../../application/recovery/runtime/recoveryRuntime";

export function recoverLocksDomain(): boolean {
  return recover("locks").recovered;
}
