import type { WorkflowStep } from "./workflowStep"

export interface WorkflowDefinition<TContext> {
  key?: string;
  id: string
  steps: WorkflowStep<TContext>[]
}
