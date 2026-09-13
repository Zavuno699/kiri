export interface DeviceRuntimeActivation {
  domain: "devices"
  pageReady: boolean
  workspaceReady: boolean
  enabled: boolean
}

export const deviceRuntimeActivation:
  DeviceRuntimeActivation = {
  domain: "devices",
  pageReady: true,
  workspaceReady: true,
  enabled: true,
}
