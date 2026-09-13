import { reconcileValue } from "../../../application/reconciliation/engine/reconcileValue";

export function reconcilePayments<T>(
  local: T | null,
  authoritative: T | null,
) {
  return reconcileValue({
    local,
    authoritative,
  });
}
