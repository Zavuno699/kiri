import {
  listWorkflowStepsFor,
} from "../registry/workflowStepRegistry";

export function selectWorkflowSteps(
  workflowId: string,
) {
  return listWorkflowStepsFor(
    workflowId,
  );
}
