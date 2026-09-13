export interface LeaseWorkspaceAdapter {
  bind(
    value: unknown,
  ): unknown
}

export const leaseWorkspaceAdapter:
  LeaseWorkspaceAdapter = {
  bind(value) {
    return value
  },
}
