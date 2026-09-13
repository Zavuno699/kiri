export interface DeviceStatusProjection {
  deviceId: string
  status: "online" | "offline"
  lastSeenAt?: string
}

export function projectDeviceStatus(
  deviceId: string,
  connected: boolean,
  occurredAt: string,
): DeviceStatusProjection {
  return {
    deviceId,
    status:
      connected
        ? "online"
        : "offline",
    lastSeenAt: occurredAt,
  }
}
