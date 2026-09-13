import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export interface LockWorkspaceController {
  load(
    query?: unknown,
  ): Promise<WorkspaceBinding>
  refresh(): Promise<WorkspaceBinding>
}

export function createLockWorkspaceController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): LockWorkspaceController {
  let current: WorkspaceBinding = {
    id: "locks.workspace",
    domain: "locks",
    pageId: "lock.workspace",
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
