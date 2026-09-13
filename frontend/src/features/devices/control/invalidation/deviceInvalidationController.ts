export interface DeviceInvalidationController {
  invalidate(
    id?: string,
    reason?: string,
  ): void
}

export function createDeviceInvalidationController(
  invalidate: (
    id?: string,
    reason?: string,
  ) => void,
): DeviceInvalidationController {
  return {
    invalidate,
  }
}
