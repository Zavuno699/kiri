import type {
  EntityFacet,
} from "../contracts/entityFacet";

import type {
  OperationalEntityView,
} from "../contracts/operationalEntityView";

export function buildEntityFacets(
  entity:
    | OperationalEntityView
    | null,
): EntityFacet[] {
  if (!entity) {
    return [];
  }

  const healthSeverity =
    entity.health ===
      "critical"
      ? "danger"
      : entity.health ===
          "degraded"
        ? "warning"
        : entity.health ===
            "healthy"
          ? "success"
          : "neutral";

  return [
    {
      key:
        "domain",
      label:
        "Domain",
      value:
        entity.domain,
      severity:
        "info",
    },
    {
      key:
        "type",
      label:
        "Type",
      value:
        entity.type,
      severity:
        "neutral",
    },
    {
      key:
        "status",
      label:
        "Status",
      value:
        entity.status,
      severity:
        "info",
    },
    {
      key:
        "health",
      label:
        "Health",
      value:
        entity.health,
      severity:
        healthSeverity,
    },
  ];
}
