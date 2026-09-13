export interface SecurityDetailPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const securityDetailPageAdapter:
  SecurityDetailPageAdapter = {
  toViewModel(value) {
    return value
  },
}
