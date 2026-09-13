import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export interface SecurityWorkspaceController {
  load(
    query?: unknown,
  ): Promise<WorkspaceBinding>
  refresh(): Promise<WorkspaceBinding>
}

export function createSecurityWorkspaceController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): SecurityWorkspaceController {
  let current: WorkspaceBinding = {
    id: "security.workspace",
    domain: "security",
    pageId: "security.workspace",
    loading: false,
    refreshing: false,
    degraded: false ? false : true,
    error:
      false
        ? undefined
        : "Production capability is not verified.",
  }

  return {
    async load(query) {
      if (!false) {
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
