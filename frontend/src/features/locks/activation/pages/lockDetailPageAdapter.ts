export interface LockDetailPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const lockDetailPageAdapter:
  LockDetailPageAdapter = {
  toViewModel(value) {
    return value
  },
}
