export interface WorkflowStep<TContext> {
  id: string
  execute(context: TContext): Promise<TContext>
}
