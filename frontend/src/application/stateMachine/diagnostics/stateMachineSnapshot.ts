import {
  getStateMachineDiagnostics,
} from "./stateMachineDiagnostics";

import {
  getStateMachineCoverage,
} from "./stateMachineCoverage";

export function getStateMachineSnapshot() {
  return {
    diagnostics:
      getStateMachineDiagnostics(),
    coverage:
      getStateMachineCoverage(),
    capturedAt:
      new Date().toISOString(),
  };
}
