import {
  coordinateRefresh,
} from "../../../../application/persistence/runtime/coordinateRefresh";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function queryDevices<TResult = unknown>(
  query: unknown,
): Promise<TResult> {
  requireCapability(
    "devices.read",
  );

  return coordinateRefresh<TResult>(
    "devices",
    "devices",
    query,
  );
}
