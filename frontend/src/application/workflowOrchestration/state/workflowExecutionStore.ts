import type {
  WorkflowExecutionState,
} from "../contracts/workflowExecutionState";

let state: WorkflowExecutionState = {
  activeWorkflowId:
    null,
  correlationId:
    null,
  entityId:
    null,
  outcome:
    "idle",
  activeStepId:
    null,
  completedStepIds:
    [],
  failedStepId:
    null,
  compensationStepIds:
    [],
  reasons:
    [],
  loading:
    false,
  error:
    null,
};

const listeners = new Set<
  () => void
>();

export function getWorkflowExecutionState(): WorkflowExecutionState {
  return {
    ...state,
    completedStepIds: [
      ...state.completedStepIds,
    ],
    compensationStepIds: [
      ...state.compensationStepIds,
    ],
    reasons: [
      ...state.reasons,
    ],
  };
}

export function setWorkflowExecutionState(
  patch:
    Partial<WorkflowExecutionState>,
): void {
  state = {
    ...state,
    ...patch,
  };

  for (
    const listener of
      listeners
  ) {
    listener();
  }
}

export function subscribeWorkflowExecution(
  listener: () => void,
): () => void {
  listeners.add(
    listener,
  );

  return () => {
    listeners.delete(
      listener,
    );
  };
}

export function resetWorkflowExecution(): void {
  setWorkflowExecutionState({
    activeWorkflowId:
      null,
    correlationId:
      null,
    entityId:
      null,
    outcome:
      "idle",
    activeStepId:
      null,
    completedStepIds:
      [],
    failedStepId:
      null,
    compensationStepIds:
      [],
    reasons:
      [],
    loading:
      false,
    error:
      null,
  });
}
