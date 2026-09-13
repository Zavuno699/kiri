import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export interface PaymentWorkspaceController {
  load(
    query?: unknown,
  ): Promise<WorkspaceBinding>
  refresh(): Promise<WorkspaceBinding>
}

export function createPaymentWorkspaceController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): PaymentWorkspaceController {
  let current: WorkspaceBinding = {
    id: "payments.workspace",
    domain: "payments",
    pageId: "payment.workspace",
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
