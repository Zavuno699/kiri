export interface DeviceConnectionState {
  deviceId: string
  connected: boolean
  lastSeenAt?: string
}

export function updateDeviceConnection(
  current: DeviceConnectionState,
  connected: boolean,
  occurredAt: string,
): DeviceConnectionState {
  return {
    ...current,
    connected,
    lastSeenAt: occurredAt,
  }
}
