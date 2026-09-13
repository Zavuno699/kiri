import {
  registerIncident,
} from "../incidents/incidentStore";

export function createIncident(
  input: {
    id: string;
    domain: string;
    title: string;
    description: string;
    severity:
      | "info"
      | "warning"
      | "critical"
      | "emergency";
    operatorId?: string | null;
    resourceIds?: string[];
  },
) {
  const incident = {
    id:
      input.id,
    domain:
      input.domain,
    title:
      input.title,
    description:
      input.description,
    severity:
      input.severity,
    status:
      "open" as const,
    createdAt:
      new Date().toISOString(),
    acknowledgedAt:
      null,
    resolvedAt:
      null,
    operatorId:
      input.operatorId ??
      null,
    resourceIds:
      input.resourceIds ??
      [],
  };

  registerIncident(
    incident,
  );

  return incident;
}
