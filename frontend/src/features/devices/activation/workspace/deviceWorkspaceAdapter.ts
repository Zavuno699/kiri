export interface DeviceWorkspaceAdapter {
  bind(
    value: unknown,
  ): unknown
}

export const deviceWorkspaceAdapter:
  DeviceWorkspaceAdapter = {
  bind(value) {
    return value
  },
}
