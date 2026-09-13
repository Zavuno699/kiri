import type { DeviceResource } from "./deviceResource"

export function createDeviceResource<T>(
  id: string,
): DeviceResource<T> {
  return {
    id,
    loading: false,
    refreshing: false,
    stale: false,
    version: 0,
  }
}
