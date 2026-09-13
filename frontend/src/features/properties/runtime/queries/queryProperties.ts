import {
  coordinateRefresh,
} from "../../../../application/persistence/runtime/coordinateRefresh";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function queryProperties<TResult = unknown>(
  query: unknown,
): Promise<TResult> {
  requireCapability(
    "properties.read",
  );

  return coordinateRefresh<TResult>(
    "properties",
    "properties",
    query,
  );
}
