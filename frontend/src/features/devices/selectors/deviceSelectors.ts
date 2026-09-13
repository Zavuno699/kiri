import type { DeviceRecord } from "../types/device"

export function selectOnlineDevices(
  devices: DeviceRecord[],
) {
  return devices.filter(
    (device) =>
      device.connectionStatus === "online",
  )
}

export function selectDegradedDevices(
  devices: DeviceRecord[],
) {
  return devices.filter(
    (device) =>
      device.connectionStatus === "degraded" ||
      device.healthStatus === "warning",
  )
}

export function selectCriticalDevices(
  devices: DeviceRecord[],
) {
  return devices.filter(
    (device) =>
      device.healthStatus === "critical",
  )
}

export function selectLowBatteryDevices(
  devices: DeviceRecord[],
  threshold = 20,
) {
  return devices.filter(
    (device) =>
      device.batteryPercent != null &&
      device.batteryPercent <= threshold,
  )
}
