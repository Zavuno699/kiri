export interface DevicePageDataAdapter {
  adapt(value: unknown): unknown
}

export const devicePageDataAdapter:
  DevicePageDataAdapter = {
  adapt(value) {
    return value
  },
}
