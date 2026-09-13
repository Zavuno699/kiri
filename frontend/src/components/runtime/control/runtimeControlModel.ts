import {
  getUnifiedRuntimeDiagnostics,
} from "../../../application/runtime/diagnostics/unifiedRuntimeDiagnostics";

export function getRuntimeControlModel() {
  const diagnostics =
    getUnifiedRuntimeDiagnostics();

  return {
    state:
      diagnostics.control,

    subsystems:
      diagnostics.subsystems.map(
        (item) => ({
          name:
            item.subsystem,
          ready:
            item.ready,
          degraded:
            item.degraded,
          reason:
            item.reason,
        }),
      ),
  };
}
