import type { PropertyRecord } from "../types/property"
import type { PropertyMetrics } from "../types/propertyMetrics"

export function projectPropertyMetrics(
  properties: PropertyRecord[],
): PropertyMetrics {
  return {
    occupiedUnits: properties.reduce(
      (sum, property) =>
        sum + (property.occupiedUnits ?? 0),
      0,
    ),
    availableUnits: properties.reduce(
      (sum, property) =>
        sum + (property.availableUnits ?? 0),
      0,
    ),
    totalUnits: properties.reduce(
      (sum, property) =>
        sum + (property.units ?? 0),
      0,
    ),
    activeLeases: 0,
    delinquentLeases: 0,
  }
}
