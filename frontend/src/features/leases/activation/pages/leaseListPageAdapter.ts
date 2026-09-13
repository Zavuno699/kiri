export interface LeaseListPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const leaseListPageAdapter:
  LeaseListPageAdapter = {
  toViewModel(value) {
    return value
  },
}
