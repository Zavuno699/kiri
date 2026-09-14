import { recover } from "../../../../application/recovery/runtime/recoveryRuntime";

export function recoverPaymentsDomain(): boolean {
  return recover("payments").recovered;
}
