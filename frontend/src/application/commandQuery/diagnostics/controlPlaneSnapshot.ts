import {
  getCommandQueryDiagnostics,
} from "./commandQueryDiagnostics";

import {
  getCommandQueryCoverage,
} from "./commandQueryCoverage";

export function getControlPlaneSnapshot() {
  return {
    diagnostics:
      getCommandQueryDiagnostics(),
    coverage:
      getCommandQueryCoverage(),
    capturedAt:
      new Date().toISOString(),
  };
}
