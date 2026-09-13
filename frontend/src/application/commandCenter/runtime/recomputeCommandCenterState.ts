import {
  listIncidents,
} from "../incidents/incidentStore";

import {
  listRecoveries,
} from "../recovery/recoveryStore";

import {
  updateCommandCenterState,
} from "../state/../state/commandCenterStore";

export function recomputeCommandCenterState(): void {
  const incidents =
    listIncidents();

  const recoveries =
    listRecoveries();

  const criticalCount =
    incidents.filter(
      (incident) =>
        incident.severity ===
          "critical" ||
        incident.severity ===
          "emergency",
    ).length;

  const warningCount =
    incidents.filter(
      (incident) =>
        incident.severity ===
        "warning",
    ).length;

  const infoCount =
    incidents.filter(
      (incident) =>
        incident.severity ===
        "info",
    ).length;

  const activeIncident =
    incidents.find(
      (incident) =>
        incident.status !==
          "resolved" &&
        incident.status !==
          "closed",
    ) ?? null;

  const activeRecovery =
    recoveries.find(
      (recovery) =>
        recovery.status !==
          "completed" &&
        recovery.status !==
          "failed" &&
        recovery.status !==
          "aborted",
    ) ?? null;

  updateCommandCenterState({
    status:
      activeRecovery
        ? "recovery"
        : criticalCount > 0
          ? "incident"
          : "operational",

    activeIncidentId:
      activeIncident?.id ??
      null,

    activeRecoveryId:
      activeRecovery?.id ??
      null,

    criticalCount,
    warningCount,
    infoCount,
  });
}
