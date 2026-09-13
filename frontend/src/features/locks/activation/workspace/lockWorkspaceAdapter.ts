export interface LockWorkspaceAdapter {
  bind(
    value: unknown,
  ): unknown
}

export const lockWorkspaceAdapter:
  LockWorkspaceAdapter = {
  bind(value) {
    return value
  },
}
