import {
  getGlobalStateCoverage,
} from "./globalStateCoverage";

import {
  getGlobalStateSnapshot,
} from "./globalStateSnapshot";

export function getGlobalStateConvergence() {
  const coverage =
    getGlobalStateCoverage();

  const state =
    getGlobalStateSnapshot();

  return {
    coverage,
    state,

    converged:
      coverage.coordinated &&
      state.initialized,
  };
}
