import type { DeviceRecord } from "../types/device"

export interface DeviceOperationalProjection {
  total: number
  online: number
  degraded: number
  offline: number
  critical: number
  lowBattery: number
}

export function projectDeviceOperations(
  devices: DeviceRecord[],
): DeviceOperationalProjection {
  return {
    total: devices.length,

    online: devices.filter(
      (device) =>
        device.connectionStatus ===
        "online",
    ).length,

    degraded: [].filter(
      (device) =>
        device.connectionStatus ===
        "degraded",
    ).length,

    offline: devices.filter(
      (device) =>
        device.connectionStatus ===
        "offline",
    ).length,

    critical: devices.filter(
      (device) =>
        device.healthStatus ===
        "critical",
    ).length,

    lowBattery: devices.filter(
      (device) =>
        device.batteryPercent != null &&
        device.batteryPercent <= 20,
    ).length,
  }
}
