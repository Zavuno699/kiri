export interface LeaseDetailPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const leaseDetailPageAdapter:
  LeaseDetailPageAdapter = {
  toViewModel(value) {
    return value
  },
}
