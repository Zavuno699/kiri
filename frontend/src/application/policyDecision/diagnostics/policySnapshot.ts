import {
  getPolicyDiagnostics,
} from "./policyDiagnostics";

import {
  getPolicyCoverage,
} from "./policyCoverage";

export function getPolicySnapshot() {
  return {
    diagnostics:
      getPolicyDiagnostics(),
    coverage:
      getPolicyCoverage(),
    capturedAt:
      new Date().toISOString(),
  };
}
