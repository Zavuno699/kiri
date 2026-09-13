export interface PropertyRuntimeActivation {
  domain: "properties"
  pageReady: boolean
  workspaceReady: boolean
  enabled: boolean
}

export const propertyRuntimeActivation:
  PropertyRuntimeActivation = {
  domain: "properties",
  pageReady: true,
  workspaceReady: true,
  enabled: true,
}
