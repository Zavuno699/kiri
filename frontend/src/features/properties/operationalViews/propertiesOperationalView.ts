import type {
  OperationalEntityView,
} from "../../../application/operationalViews/contracts/operationalEntityView";

export function buildPropertiesOperationalView(
  id: string,
  data: Record<string, unknown> = {},
): OperationalEntityView {
  return {
    id,
    domain:
      "properties",
    type:
      "properties",
    title:
      String(
        data.name ??
        data.title ??
        id,
      ),
    subtitle:
      data.reference
        ? String(
            data.reference,
          )
        : null,
    status:
      String(
        data.status ??
        "unknown",
      ),
    health:
      data.health ===
        "critical"
        ? "critical"
        : data.health ===
            "degraded"
          ? "degraded"
          : data.health ===
              "healthy"
            ? "healthy"
            : "unknown",
    metadata:
      data,
  };
}
