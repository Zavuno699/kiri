import {
  runIntegrityChecks,
} from "../integrity/runtime/integrityRuntime";

import {
  refreshRuntimeIntegrity,
} from "../runtimeIntegrity/runtime/runtimeIntegrityRuntime";

export function refreshOperationalIntegrity(): void {
  runIntegrityChecks();
  refreshRuntimeIntegrity();
}

export function operationalIntegrityReady(): boolean {
  refreshOperationalIntegrity();

  return true;
}
