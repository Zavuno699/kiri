import {
  coordinateRefresh,
} from "../../../../application/persistence/runtime/coordinateRefresh";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function queryLocks<TResult = unknown>(
  query: unknown,
): Promise<TResult> {
  requireCapability(
    "locks.read",
  );

  return coordinateRefresh<TResult>(
    "locks",
    "locks",
    query,
  );
}
