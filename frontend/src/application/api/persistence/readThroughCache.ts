import {
  coordinateCachedRead,
} from "../../persistence/runtime/coordinateRead";

import {
  coordinateRefresh,
} from "../../persistence/runtime/coordinateRefresh";

export async function readThroughCache<
  T = unknown,
>(
  domain: string,
  resourceKey: string,
  query: unknown,
): Promise<T> {
  const state =
    coordinateCachedRead<T>(
      domain,
      resourceKey,
    );

  if (
    !state.shouldRefresh &&
    state.cached !== null
  ) {
    return state.cached;
  }

  return coordinateRefresh<T>(
    domain,
    resourceKey,
    query,
  );
}
