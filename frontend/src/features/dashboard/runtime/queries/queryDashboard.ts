import {
  coordinateRefresh,
} from "../../../../application/persistence/runtime/coordinateRefresh";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function queryDashboard<TResult = unknown>(
  query: unknown,
): Promise<TResult> {
  requireCapability(
    "dashboard.read",
  );

  return coordinateRefresh<TResult>(
    "dashboard",
    "dashboard",
    query,
  );
}
