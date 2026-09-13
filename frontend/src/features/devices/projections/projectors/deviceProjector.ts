export interface DeviceProjector<T> {
  project(event: T): unknown
}

export function createDeviceProjector<T>(
  project: (event: T) => unknown,
): DeviceProjector<T> {
  return {
    project,
  }
}
