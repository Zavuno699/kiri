export type WorkflowStepType =
  | "command"
  | "query"
  | "policy"
  | "event"
  | "projection"
  | "state";

export interface WorkflowStep {
  id: string;
  workflowId: string;
  order: number;
  type: WorkflowStepType;
  name: string;
  domain: string;
  action: string;
  required: boolean;
  compensatable: boolean;
}
