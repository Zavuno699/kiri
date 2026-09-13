export interface PropertyDetailPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const propertyDetailPageAdapter:
  PropertyDetailPageAdapter = {
  toViewModel(value) {
    return value
  },
}
