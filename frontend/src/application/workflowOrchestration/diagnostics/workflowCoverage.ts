import {
  getWorkflowDiagnostics,
} from "./workflowDiagnostics";

export function getWorkflowCoverage() {
  const diagnostics =
    getWorkflowDiagnostics();

  return {
    workflows:
      diagnostics.workflowCount,
    steps:
      diagnostics.stepCount,
    compensations:
      diagnostics.compensationCount,
    transactional:
      diagnostics.transactionalCount,
    ready:
      diagnostics.workflowCount >=
        5 &&
      diagnostics.stepCount >=
        10 &&
      diagnostics.compensationCount >=
        3,
  };
}
