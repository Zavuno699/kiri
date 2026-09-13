import type { WorkflowDefinition } from "../../../application/workflows/workflowDefinition"

export interface PropertyWorkspaceContext {
  propertyId: string
  loaded: boolean
}

export const propertyWorkspaceWorkflow:
  WorkflowDefinition<PropertyWorkspaceContext> = {
    id: "property.workspace",
    steps: [
      {
        id: "load-property",
        async execute(context) {
          return {
            ...context,
            loaded: context.propertyId.length > 0,
          }
        },
      },
    ],
  }
