import {
  getUnifiedRuntimeDiagnostics,
} from "./unifiedRuntimeDiagnostics";

export function getUnifiedRuntimeSnapshot() {
  const diagnostics =
    getUnifiedRuntimeDiagnostics();

  return {
    started:
      diagnostics.control.started,

    operational:
      diagnostics.operational,

    degraded:
      diagnostics.control.degraded,

    safeMode:
      diagnostics.safeMode,

    readySubsystemCount:
      diagnostics.readySubsystemCount,

    degradedSubsystemCount:
      diagnostics.degradedSubsystemCount,
  };
}
