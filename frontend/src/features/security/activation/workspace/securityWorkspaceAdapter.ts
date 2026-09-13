export interface SecurityWorkspaceAdapter {
  bind(
    value: unknown,
  ): unknown
}

export const securityWorkspaceAdapter:
  SecurityWorkspaceAdapter = {
  bind(value) {
    return value
  },
}
