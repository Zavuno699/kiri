export interface LockRuntimeActivation {
  domain: "locks"
  pageReady: boolean
  workspaceReady: boolean
  enabled: boolean
}

export const lockRuntimeActivation:
  LockRuntimeActivation = {
  domain: "locks",
  pageReady: false,
  workspaceReady: false,
  enabled: false,
}
