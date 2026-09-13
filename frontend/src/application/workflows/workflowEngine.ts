export interface WorkflowStep<TContext> {
  id: string
  execute(
    context: TContext,
  ): Promise<TContext>
}

export interface WorkflowDefinition<TContext> {
  id: string
  steps: WorkflowStep<TContext>[]
}

export async function executeWorkflow<
  TContext,
>(
  definition: WorkflowDefinition<TContext>,
  initial: TContext,
): Promise<TContext> {
  let context = initial

  for (const step of definition.steps) {
    context = await step.execute(context)
  }

  return context
}
