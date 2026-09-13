import {
  getPersistenceEntry,
} from "../cache/persistenceStore";

import {
  writePersistence,
} from "./writePersistence";

import {
  getResourceState,
  setResourceState,
} from "../../projections/state/resourceStateStore";

export function hydrateProjectionFromPersistence(
  domain: string,
  resourceKey: string,
): void {
  const cacheKey =
    `${domain}:${resourceKey}`;

  const persisted =
    getPersistenceEntry(cacheKey);

  const projection =
    getResourceState(resourceKey);

  if (!persisted || !projection) {
    return;
  }

  if (
    persisted.data !== null &&
    projection.status !== "ready"
  ) {
    setResourceState({
      ...projection,
      data:
        persisted.data,
      status:
        persisted.status === "stale"
          ? "stale"
          : "ready",
      version:
        persisted.version,
      updatedAt:
        persisted.cachedAt,
      error:
        persisted.error,
    });
  }

  if (
    projection.data !== null &&
    persisted.data === null
  ) {
    writePersistence(
      cacheKey,
      projection.data,
    );
  }
}
