import {
  coordinateRefresh,
} from "../../../../application/persistence/runtime/coordinateRefresh";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function querySecurity<TResult = unknown>(
  query: unknown,
): Promise<TResult> {
  requireCapability(
    "security.read",
  );

  return coordinateRefresh<TResult>(
    "security",
    "security",
    query,
  );
}
