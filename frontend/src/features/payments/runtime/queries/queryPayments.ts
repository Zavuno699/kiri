import {
  coordinateRefresh,
} from "../../../../application/persistence/runtime/coordinateRefresh";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function queryPayments<TResult = unknown>(
  query: unknown,
): Promise<TResult> {
  requireCapability(
    "payments.read",
  );

  return coordinateRefresh<TResult>(
    "payments",
    "payments",
    query,
  );
}
