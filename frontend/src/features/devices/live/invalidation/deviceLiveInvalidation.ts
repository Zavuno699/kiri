export interface DeviceLiveInvalidation {
  key: string
  reason: string
  occurredAt: string
}

export function createDeviceLiveInvalidation(
  key: string,
  reason: string,
): DeviceLiveInvalidation {
  return {
    key,
    reason,
    occurredAt:
      new Date().toISOString(),
  }
}
