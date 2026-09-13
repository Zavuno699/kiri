import type {
  WorkflowExecution,
} from "../contracts/workflowExecution";

export interface WorkflowState {
  initialized: boolean;
  definitions: string[];
  executions: WorkflowExecution[];
  activeWorkflowId: string | null;
}
