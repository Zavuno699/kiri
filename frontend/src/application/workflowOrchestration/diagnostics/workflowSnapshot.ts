import {
  getWorkflowDiagnostics,
} from "./workflowDiagnostics";

import {
  getWorkflowCoverage,
} from "./workflowCoverage";

export function getWorkflowSnapshot() {
  return {
    diagnostics:
      getWorkflowDiagnostics(),
    coverage:
      getWorkflowCoverage(),
    capturedAt:
      new Date().toISOString(),
  };
}
