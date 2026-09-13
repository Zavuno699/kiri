import {
  getCommandCenterDiagnostics,
} from "./commandCenterDiagnostics";

export function getCommandCenterSnapshot() {
  const diagnostics =
    getCommandCenterDiagnostics();

  return {
    status:
      diagnostics.state.status,

    activeIncidentId:
      diagnostics.state.activeIncidentId,

    activeRecoveryId:
      diagnostics.state.activeRecoveryId,

    criticalCount:
      diagnostics.state.criticalCount,

    warningCount:
      diagnostics.state.warningCount,

    infoCount:
      diagnostics.state.infoCount,

    incidentCount:
      diagnostics.incidentCount,

    recoveryCount:
      diagnostics.recoveryCount,
  };
}
