import type { LockResource } from "./lockResource"

export function createLockResource<T>(
  id: string,
): LockResource<T> {
  return {
    id,
    loading: false,
    refreshing: false,
    stale: false,
    version: 0,
  }
}
