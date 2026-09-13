export interface DeviceDetailPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const deviceDetailPageAdapter:
  DeviceDetailPageAdapter = {
  toViewModel(value) {
    return value
  },
}
