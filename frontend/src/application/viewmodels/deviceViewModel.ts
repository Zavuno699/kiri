import type {
  DeviceRecord,
} from "../../features/devices/types/device"

export interface DeviceViewModel
  extends DeviceRecord {
  connectionLabel: string
  healthLabel: string
  batteryLabel: string
}

export function toDeviceViewModel(
  device: DeviceRecord,
): DeviceViewModel {
  return {
    ...device,
    connectionLabel:
      device.connectionStatus ?? "Unknown",
    healthLabel:
      device.healthStatus ?? "Unknown",
    batteryLabel:
      device.batteryPercent == null
        ? "Unknown"
        : `${device.batteryPercent}%`,
  }
}
