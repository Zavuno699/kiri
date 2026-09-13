export interface LeasePageDataAdapter {
  adapt(value: unknown): unknown
}

export const leasePageDataAdapter:
  LeasePageDataAdapter = {
  adapt(value) {
    return value
  },
}
