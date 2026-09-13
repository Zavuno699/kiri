export interface DeviceLike {
  connectionStatus?: string
  healthStatus?: string
  batteryPercent?: number
}

export function offlineCount(
  devices: DeviceLike[],
): number {
  return devices.filter(
    (device) =>
      device.connectionStatus ===
      "offline",
  ).length
}

export function lowBatteryCount(
  devices: DeviceLike[],
  threshold = 20,
): number {
  return devices.filter(
    (device) =>
      device.batteryPercent != null &&
      device.batteryPercent <= threshold,
  ).length
}
