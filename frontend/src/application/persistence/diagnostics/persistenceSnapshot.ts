import {
  listPersistenceEntries,
} from "../cache/persistenceStore";

export function getPersistenceSnapshot() {
  return listPersistenceEntries().map(
    (entry) => ({
      key:
        entry.key,
      domain:
        entry.domain,
      resourceKey:
        entry.resourceKey,
      status:
        entry.status,
      version:
        entry.version,
      cachedAt:
        entry.cachedAt,
      expiresAt:
        entry.expiresAt,
      hasData:
        entry.data !== null,
      error:
        entry.error,
    }),
  );
}
