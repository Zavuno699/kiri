export interface SecurityRuntimeActivation {
  domain: "security"
  pageReady: boolean
  workspaceReady: boolean
  enabled: boolean
}

export const securityRuntimeActivation:
  SecurityRuntimeActivation = {
  domain: "security",
  pageReady: false,
  workspaceReady: false,
  enabled: false,
}
