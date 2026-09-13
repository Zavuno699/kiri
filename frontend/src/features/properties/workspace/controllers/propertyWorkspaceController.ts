import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export interface PropertyWorkspaceController {
  load(
    query?: unknown,
  ): Promise<WorkspaceBinding>
  refresh(): Promise<WorkspaceBinding>
}

export function createPropertyWorkspaceController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): PropertyWorkspaceController {
  let current: WorkspaceBinding = {
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

  return {
    async load(query) {
      if (!true) {
        return current
      }

      current = {
        ...current,
        loading: true,
      }

      try {
        const data = await load(query)

        current = {
          ...current,
          loading: false,
          data,
          degraded: false,
        }
      } catch (error) {
        current = {
          ...current,
          loading: false,
          degraded: true,
          error:
            error instanceof Error
              ? error.message
              : "Workspace load failed.",
        }
      }

      return current
    },

    async refresh() {
      return current
    },
  }
}
