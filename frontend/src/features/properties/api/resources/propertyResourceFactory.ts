import type { PropertyResource } from "./propertyResource"

export function createPropertyResource<T>(
  id: string,
): PropertyResource<T> {
  return {
    id,
    loading: false,
    refreshing: false,
    stale: false,
    version: 0,
  }
}
