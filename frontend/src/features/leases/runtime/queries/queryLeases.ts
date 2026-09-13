import {
  coordinateRefresh,
} from "../../../../application/persistence/runtime/coordinateRefresh";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function queryLeases<TResult = unknown>(
  query: unknown,
): Promise<TResult> {
  requireCapability(
    "leases.read",
  );

  return coordinateRefresh<TResult>(
    "leases",
    "leases",
    query,
  );
}
