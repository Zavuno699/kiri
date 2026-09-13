export interface DeviceConfirmation {
  commandId: string
  required: boolean
  confirmed: boolean
  reason?: string
}

export function createDeviceConfirmation(
  commandId: string,
): DeviceConfirmation {
  return {
    commandId,
    required: true,
    confirmed: false,
    reason:
      true
        ? undefined
        : "Command capability is unavailable.",
  }
}
