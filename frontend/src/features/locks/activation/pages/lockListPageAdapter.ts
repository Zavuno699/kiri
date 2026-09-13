export interface LockListPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const lockListPageAdapter:
  LockListPageAdapter = {
  toViewModel(value) {
    return value
  },
}
