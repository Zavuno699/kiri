import {
  readPersistence,
} from "./readPersistence";

import {
  markPersistenceStale,
} from "../cache/markPersistenceStale";

export function coordinateCachedRead<T>(
  domain: string,
  resourceKey: string,
): {
  key: string;
  cached: T | null;
  shouldRefresh: boolean;
} {
  const key =
    `${domain}:${resourceKey}`;

  const cached =
    readPersistence<T>(key);

  if (cached !== null) {
    return {
      key,
      cached,
      shouldRefresh: false,
    };
  }

  markPersistenceStale(key);

  return {
    key,
    cached: null,
    shouldRefresh: true,
  };
}
