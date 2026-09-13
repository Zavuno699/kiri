import type { WorkflowDefinition } from "../../../application/workflows/workflowDefinition"

export interface DashboardRefreshContext {
  refreshed: string[]
}

export const dashboardRefreshWorkflow:
  WorkflowDefinition<DashboardRefreshContext> = {
    id: "dashboard.refresh",
    steps: [
      {
        id: "mark-started",
        async execute(context) {
          return {
            ...context,
            refreshed: [
              ...context.refreshed,
              "dashboard",
            ],
          }
        },
      },
    ],
  }
