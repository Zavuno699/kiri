import { recover } from "../../../application/recovery/runtime/recoveryRuntime";

export function recoverPaymentsDomain(): boolean {
  return recover({
    scope: "resource",
    reason: "payments-resource-recovery",
    resourceType: "payments",
  });
}
