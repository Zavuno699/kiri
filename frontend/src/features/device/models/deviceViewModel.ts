export interface DeviceViewModel {
  id: string
  name: string
  serialNumber?: string
  connection: string
  health: string
  battery: string
  firmware: string
}

export function buildDeviceViewModel(
  device: {
    id: string
    name: string
    serialNumber?: string
    connectionStatus: string
    healthStatus: string
    batteryPercent?: number
    firmwareVersion?: string
  },
): DeviceViewModel {
  return {
    id: device.id,
    name: device.name,
    serialNumber: device.serialNumber,
    connection:
      device.connectionStatus,
    health: device.healthStatus,
    battery:
      device.batteryPercent == null
        ? "Unknown"
        : `${device.batteryPercent}%`,
    firmware:
      device.firmwareVersion ?? "Unknown",
  }
}
