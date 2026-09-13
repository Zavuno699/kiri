export interface LeaseRuntimeActivation {
  domain: "leases"
  pageReady: boolean
  workspaceReady: boolean
  enabled: boolean
}

export const leaseRuntimeActivation:
  LeaseRuntimeActivation = {
  domain: "leases",
  pageReady: true,
  workspaceReady: true,
  enabled: true,
}
