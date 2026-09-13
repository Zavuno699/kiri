import type { LeaseResource } from "./leaseResource"

export function createLeaseResource<T>(
  id: string,
): LeaseResource<T> {
  return {
    id,
    loading: false,
    refreshing: false,
    stale: false,
    version: 0,
  }
}
