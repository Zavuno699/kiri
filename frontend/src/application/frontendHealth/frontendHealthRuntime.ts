import {
  runConsistencyEngine,
} from "../consistency/runtime/consistencyRuntime";

import {
  refreshDegradedMode,
} from "../degradedMode/runtime/degradedModeRuntime";

import {
  refreshDomainHealth,
} from "../domainHealth/runtime/domainHealthRuntime";

import {
  runIntegrityChecks,
} from "../integrity/runtime/integrityRuntime";

import {
  refreshRuntimeIntegrity,
} from "../runtimeIntegrity/runtime/runtimeIntegrityRuntime";

export function refreshFrontendHealth(): void {
  runIntegrityChecks();
  refreshRuntimeIntegrity();
  runConsistencyEngine();
  refreshDegradedMode();
  refreshDomainHealth();
}
