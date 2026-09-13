import {
  getFlowCoverageSnapshot,
} from "./flowCoverageSnapshot";

import {
  getApiCoverageSnapshot,
} from "../../api/diagnostics/apiCoverageSnapshot";

import {
  getProjectionDiagnostics,
} from "../../projections/diagnostics/projectionDiagnostics";

import {
  getPersistenceDiagnostics,
} from "../../persistence/diagnostics/persistenceDiagnostics";

export function getApplicationConvergenceDiagnostics() {
  const flows =
    getFlowCoverageSnapshot();

  const api =
    getApiCoverageSnapshot();

  const projections =
    getProjectionDiagnostics();

  const persistence =
    getPersistenceDiagnostics();

  return {
    flows,
    api,
    projections,
    persistence,

    convergenceReady:
      flows.domainCount === 7 &&
      api.total === 7 &&
      projections.projectionCount >= 7 &&
      persistence.policyCount >= 7,
  };
}
