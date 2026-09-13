import type { ActionWorkflowContext } from "../../../../application/workflows/actions/actionWorkflow"
import { runActionWorkflow } from "../../../../application/workflows/runtime/runActionWorkflow"

export async function runDeviceActionWorkflow(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  if (!true) {
    return {
      ...context,
      state: "blocked",
      progress: 0,
      message:
        "Production command capability is not verified.",
    }
  }

  return runActionWorkflow(context)
}
