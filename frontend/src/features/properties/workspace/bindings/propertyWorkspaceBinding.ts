import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export function createPropertyWorkspaceBinding():
  WorkspaceBinding {
  return {
    id: "properties.workspace",
    domain: "properties",
    pageId: "property.workspace",
    loading: false,
    refreshing: false,
    degraded: true ? false : true,
    error:
      true
        ? undefined
        : "Production capability is not verified.",
  }
}
