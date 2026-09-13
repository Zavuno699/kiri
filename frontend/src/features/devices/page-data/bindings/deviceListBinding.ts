export interface DeviceListBinding {
  items: unknown[]
  total: number
  loading: boolean
  refreshing: boolean
}

export const emptyDeviceListBinding:
  DeviceListBinding = {
  items: [],
  total: 0,
  loading: false,
  refreshing: false,
}
