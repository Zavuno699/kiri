import type {
  PropertyRecord,
} from "../../features/properties/types/property"

export interface PropertyViewModel
  extends PropertyRecord {
  occupancyLabel: string
  availabilityLabel: string
  statusLabel: string
}

export function toPropertyViewModel(
  property: PropertyRecord,
): PropertyViewModel {
  return {
    ...property,
    occupancyLabel:
      property.occupancy ?? "Unknown",
    availabilityLabel:
      `${property.availableUnits} available`,
    statusLabel:
      property.status ?? "Unknown",
  }
}
