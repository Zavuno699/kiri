import { reconcileValue } from "../../../application/reconciliation/engine/reconcileValue";

export function reconcileSecurity<T>(
  local: T | null,
  authoritative: T | null,
) {
  return reconcileValue({
    local,
    authoritative,
  });
}
