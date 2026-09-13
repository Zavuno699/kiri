export interface DeviceListPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const deviceListPageAdapter:
  DeviceListPageAdapter = {
  toViewModel(value) {
    return value
  },
}
