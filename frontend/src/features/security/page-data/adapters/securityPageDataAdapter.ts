export interface SecurityPageDataAdapter {
  adapt(value: unknown): unknown
}

export const securityPageDataAdapter:
  SecurityPageDataAdapter = {
  adapt(value) {
    return value
  },
}
