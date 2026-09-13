import type { SecurityResource } from "./securityResource"

export function createSecurityResource<T>(
  id: string,
): SecurityResource<T> {
  return {
    id,
    loading: false,
    refreshing: false,
    stale: false,
    version: 0,
  }
}
