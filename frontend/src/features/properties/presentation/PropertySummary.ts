import type {
  OperationalProperty,
} from "../../../domain/contracts"

export function propertySummary(
  property: OperationalProperty,
) {
  return {
    id: property.id,
    name: property.name,
    status: property.status ?? "unknown",
    occupancy:
      property.occupancy === undefined
        ? "—"
        : `${property.occupancy.toFixed(1)}%`,
    availableUnits:
      property.availableUnits === undefined
        ? "—"
        : String(property.availableUnits),
    totalUnits:
      property.totalUnits === undefined
        ? "—"
        : String(property.totalUnits),
  }
}
