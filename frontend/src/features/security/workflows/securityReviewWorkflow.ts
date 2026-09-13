import type { WorkflowDefinition } from "../../../application/workflows/workflowDefinition"

export interface SecurityReviewContext {
  subjectId: string
  authenticated: boolean
  authorized: boolean
  reviewed: boolean
}

export const securityReviewWorkflow:
  WorkflowDefinition<SecurityReviewContext> = {
    id: "security.review",
    steps: [
      {
        id: "authentication",
        async execute(context) {
          return {
            ...context,
            authenticated:
              context.subjectId.length > 0,
          }
        },
      },
      {
        id: "authorization",
        async execute(context) {
          return {
            ...context,
            authorized:
              context.authenticated,
          }
        },
      },
      {
        id: "review",
        async execute(context) {
          return {
            ...context,
            reviewed:
              context.authorized,
          }
        },
      },
    ],
  }
