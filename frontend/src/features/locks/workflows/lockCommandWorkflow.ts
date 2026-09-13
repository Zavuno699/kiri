import type { WorkflowDefinition } from "../../../application/workflows/workflowDefinition"

export interface LockCommandContext {
  lockId: string
  command: "lock" | "unlock" | "freeze"
  allowed: boolean
  sent: boolean
}

export const lockCommandWorkflow:
  WorkflowDefinition<LockCommandContext> = {
    id: "lock.command",
    steps: [
      {
        id: "authorize",
        async execute(context) {
          return {
            ...context,
            allowed:
              context.lockId.length > 0,
          }
        },
      },
      {
        id: "dispatch",
        async execute(context) {
          return {
            ...context,
            sent: context.allowed,
          }
        },
      },
    ],
  }
