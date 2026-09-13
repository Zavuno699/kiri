import {
  getCachePolicy,
} from "../registry/persistenceRegistry";

import {
  getPersistenceEntry,
  setPersistenceEntry,
} from "../cache/persistenceStore";

export function writePersistence<T>(
  key: string,
  data: T,
): void {
  const entry =
    getPersistenceEntry(key);

  if (!entry) {
    return;
  }

  const policy =
    getCachePolicy(
      `${entry.domain}.${entry.resourceKey}`,
    );

  const ttl =
    policy?.ttlMs ?? 30_000;

  const now =
    Date.now();

  setPersistenceEntry({
    ...entry,
    data,
    status: "ready",
    version:
      entry.version + 1,
    cachedAt:
      new Date(now).toISOString(),
    expiresAt:
      new Date(
        now + ttl,
      ).toISOString(),
    error: null,
  });
}
