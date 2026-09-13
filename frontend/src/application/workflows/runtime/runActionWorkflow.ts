import type { ActionWorkflowContext } from "../actions/actionWorkflow"
import { prepareStep } from "../steps/prepareStep"
import { authorizeStep } from "../steps/authorizeStep"
import { confirmStep } from "../steps/confirmStep"
import { executeStep } from "../steps/executeStep"
import { completeStep } from "../steps/completeStep"

export async function runActionWorkflow(
  context: ActionWorkflowContext,
): Promise<ActionWorkflowContext> {
  let current = await prepareStep(context)
  current = await authorizeStep(current)
  current = await confirmStep(current)
  current = await executeStep(current)
  current = await completeStep(current)
  return current
}
