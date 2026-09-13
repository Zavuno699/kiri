import type { OperationalProperty } from "../../../domain/contracts"

export function propertyOccupancyPercentage(
  property: OperationalProperty,
): number {
  if (
    property.occupancy !== undefined &&
    Number.isFinite(property.occupancy)
  ) {
    return property.occupancy
  }

  if (
    property.totalUnits !== undefined &&
    property.availableUnits !== undefined &&
    property.totalUnits > 0
  ) {
    return (
      (property.totalUnits - property.availableUnits) /
      property.totalUnits
    ) * 100
  }

  return 0
}
