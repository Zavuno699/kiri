import {
  getCachePolicy,
} from "../registry/persistenceRegistry";

import {
  registerPersistenceEntry,
} from "./persistenceStore";

export function createPersistenceEntry<T>(
  domain: string,
  resourceKey: string,
  data: T | null = null,
): string {
  const key =
    `${domain}:${resourceKey}`;

  const policy =
    getCachePolicy(
      `${domain}.${resourceKey}`,
    );

  const now =
    Date.now();

  const ttl =
    policy?.ttlMs ?? 30_000;

  registerPersistenceEntry({
    key,
    domain,
    resourceKey,
    data,
    status:
      data === null
        ? "empty"
        : "ready",
    version: 0,
    cachedAt:
      data === null
        ? null
        : new Date(now).toISOString(),
    expiresAt:
      data === null
        ? null
        : new Date(
            now + ttl,
          ).toISOString(),
    error: null,
  });

  return key;
}
