import type { PropertyRecord } from "../types/property"

export function selectActiveProperties(
  properties: PropertyRecord[],
) {
  return properties.filter(
    (property) => property.status === "active",
  )
}

export function selectOccupiedProperties(
  properties: PropertyRecord[],
) {
  return properties.filter(
    (property) => property.occupancy === "occupied",
  )
}

export function selectAvailableProperties(
  properties: PropertyRecord[],
) {
  return properties.filter(
    (property) => property.occupancy === "available",
  )
}
