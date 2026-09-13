import {
  listIncidents,
} from "../incidents/incidentStore";

export function getIncidentDiagnostics() {
  const incidents =
    listIncidents();

  return {
    total:
      incidents.length,

    emergency:
      incidents.filter(
        (item) =>
          item.severity ===
          "emergency",
      ).length,

    critical:
      incidents.filter(
        (item) =>
          item.severity ===
          "critical",
      ).length,

    warning:
      incidents.filter(
        (item) =>
          item.severity ===
          "warning",
      ).length,

    open:
      incidents.filter(
        (item) =>
          item.status !==
            "resolved" &&
          item.status !==
            "closed",
      ).length,
  };
}
