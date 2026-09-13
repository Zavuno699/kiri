import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function confirmStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "confirmed",
    progress: 45,
  }
}
