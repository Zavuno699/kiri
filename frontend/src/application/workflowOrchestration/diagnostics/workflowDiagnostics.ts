import {
  listWorkflows,
} from "../registry/workflowRegistry";

import {
  listWorkflowSteps,
} from "../registry/workflowStepRegistry";

import {
  listCompensationActions,
} from "../compensation/compensationRegistry";

import {
  getWorkflowExecutionState,
} from "../state/workflowExecutionStore";

export function getWorkflowDiagnostics() {
  return {
    workflowCount:
      listWorkflows().length,

    stepCount:
      listWorkflowSteps().length,

    compensationCount:
      listCompensationActions().length,

    transactionalCount:
      listWorkflows().filter(
        (workflow) =>
          workflow.transactional,
      ).length,

    state:
      getWorkflowExecutionState(),
  };
}
