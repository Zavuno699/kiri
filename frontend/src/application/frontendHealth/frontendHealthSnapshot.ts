import {
  getConsistencyState,
} from "../consistency/state/consistencyStore";

import {
  getDegradedModeState,
} from "../degradedMode/state/degradedModeStore";

import {
  getDomainHealthState,
} from "../domainHealth/state/domainHealthStore";

import {
  getRuntimeIntegrityState,
} from "../runtimeIntegrity/state/runtimeIntegrityStore";

export function getFrontendHealthSnapshot() {
  return {
    consistency: getConsistencyState(),
    degradedMode: getDegradedModeState(),
    domainHealth: getDomainHealthState(),
    runtimeIntegrity: getRuntimeIntegrityState(),
  };
}
