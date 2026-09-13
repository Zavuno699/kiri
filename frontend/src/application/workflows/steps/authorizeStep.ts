import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function authorizeStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "authorized",
    progress: 30,
  }
}
