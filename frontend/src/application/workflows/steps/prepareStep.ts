import type { ActionWorkflowContext } from "../actions/actionWorkflow"

export async function prepareStep(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  return {
    ...context,
    state: "prepared",
    progress: 15,
  }
}
