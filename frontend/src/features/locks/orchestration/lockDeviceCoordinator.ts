export interface LockDeviceCoordinator {
  attach(
    lock: Record<string, unknown>,
    device: Record<string, unknown>,
  ): Record<string, unknown>
}

export function createLockDeviceCoordinator():
  LockDeviceCoordinator {
  return {
    attach(lock, device) {
      return {
        ...lock,
        deviceContext: {
          id: device.id,
          status: device.status,
        },
      }
    },
  }
}
