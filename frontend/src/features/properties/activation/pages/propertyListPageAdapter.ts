export interface PropertyListPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const propertyListPageAdapter:
  PropertyListPageAdapter = {
  toViewModel(value) {
    return value
  },
}
