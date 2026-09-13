import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function executeStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "executing",
    progress: 75,
  }
}
