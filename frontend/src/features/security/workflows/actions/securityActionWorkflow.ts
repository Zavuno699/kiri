import type { ActionWorkflowContext } from "../../../../application/workflows/actions/actionWorkflow"
import { runActionWorkflow } from "../../../../application/workflows/runtime/runActionWorkflow"

export async function runSecurityActionWorkflow(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  if (!false) {
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
