import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function completeStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "completed",
    progress: 100,
  }
}
