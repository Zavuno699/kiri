export interface PropertyPageDataAdapter {
  adapt(value: unknown): unknown
}

export const propertyPageDataAdapter:
  PropertyPageDataAdapter = {
  adapt(value) {
    return value
  },
}
