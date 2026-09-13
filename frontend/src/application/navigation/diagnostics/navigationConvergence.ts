import {
  getNavigationCoverage,
} from "./navigationCoverage";

import {
  getNavigationDiagnostics,
} from "./navigationDiagnostics";

export function getNavigationConvergence() {
  const coverage =
    getNavigationCoverage();

  const diagnostics =
    getNavigationDiagnostics();

  return {
    coverage,
    diagnostics,

    converged:
      coverage.converged &&
      diagnostics.navigationItems >
        0 &&
      diagnostics.routeRuntime >
        0,
  };
}
