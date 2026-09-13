import type {
  WorkflowStep,
} from "../contracts/workflowStep";

const steps = new Map<
  string,
  WorkflowStep
>();

export function registerWorkflowStep(
  step: WorkflowStep,
): void {
  steps.set(
    step.id,
    step,
  );
}

export function getWorkflowStep(
  stepId: string,
): WorkflowStep | null {
  return (
    steps.get(
      stepId,
    ) ??
    null
  );
}

export function listWorkflowSteps(): WorkflowStep[] {
  return [
    ...steps.values(),
  ];
}

export function listWorkflowStepsFor(
  workflowId: string,
): WorkflowStep[] {
  return listWorkflowSteps()
    .filter(
      (step) =>
        step.workflowId ===
        workflowId,
    )
    .sort(
      (a, b) =>
        a.order -
        b.order,
    );
}
