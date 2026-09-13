import type { WorkflowDefinition } from "./workflowDefinition"

export async function executeWorkflow<TContext>(
  workflow: WorkflowDefinition<TContext>,
  context: TContext,
): Promise<TContext> {
  let current = context

  for (const step of workflow.steps) {
    current = await step.execute(current)
  }

  return current
}
