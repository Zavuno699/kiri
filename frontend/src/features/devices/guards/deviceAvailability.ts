export interface DeviceAvailability {
  available: boolean
  reason?: string
}

export function deviceAvailable(): DeviceAvailability {
  return {
    available: true,
  }
}
