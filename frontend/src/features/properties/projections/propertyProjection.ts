import type { PropertyRecord } from "../types/property"
import type { PropertyMetrics } from "../types/propertyMetrics"

export function projectPropertyMetrics(
  properties: PropertyRecord[],
): PropertyMetrics {
  return {
    occupiedUnits: 0,
    availableUnits: properties.reduce(
      (sum, property) =>
        sum + property.total_units,
      0,
    ),
    totalUnits: properties.reduce(
      (sum, property) =>
        sum + property.total_units,
      0,
    ),
    activeLeases: 0,
    delinquentLeases: 0,
  }
}
