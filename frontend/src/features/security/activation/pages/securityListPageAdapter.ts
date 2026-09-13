export interface SecurityListPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const securityListPageAdapter:
  SecurityListPageAdapter = {
  toViewModel(value) {
    return value
  },
}
