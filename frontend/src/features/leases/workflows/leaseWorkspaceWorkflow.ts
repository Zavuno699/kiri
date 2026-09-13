import type { WorkflowDefinition } from "../../../application/workflows/workflowDefinition"

export interface LeaseWorkspaceContext {
  leaseId: string
  propertyLoaded: boolean
  paymentsLoaded: boolean
  devicesLoaded: boolean
}

export const leaseWorkspaceWorkflow:
  WorkflowDefinition<LeaseWorkspaceContext> = {
    id: "lease.workspace",
    steps: [
      {
        id: "property",
        async execute(context) {
          return {
            ...context,
            propertyLoaded:
              context.leaseId.length > 0,
          }
        },
      },
      {
        id: "payments",
        async execute(context) {
          return {
            ...context,
            paymentsLoaded:
              context.leaseId.length > 0,
          }
        },
      },
      {
        id: "devices",
        async execute(context) {
          return {
            ...context,
            devicesLoaded:
              context.leaseId.length > 0,
          }
        },
      },
    ],
  }
