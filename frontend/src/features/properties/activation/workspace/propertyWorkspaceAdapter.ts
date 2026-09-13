export interface PropertyWorkspaceAdapter {
  bind(
    value: unknown,
  ): unknown
}

export const propertyWorkspaceAdapter:
  PropertyWorkspaceAdapter = {
  bind(value) {
    return value
  },
}
