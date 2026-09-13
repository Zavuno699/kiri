import type { OperationalProperty } from "../../../domain/contracts"

export function propertyAvailableUnits(
  property: OperationalProperty,
): number {
  return property.availableUnits ?? 0
}

export function propertyTotalUnits(
  property: OperationalProperty,
): number {
  return property.totalUnits ?? 0
}
