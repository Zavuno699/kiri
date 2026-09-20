import type { PropertyRecord } from "../types/property"

export function selectActiveProperties(
  properties: PropertyRecord[],
) {
  return properties.filter(
    (property) => property.status === "active",
  )
}

export function selectOccupiedProperties(
  _properties: PropertyRecord[],
) {
  return []
}

export function selectAvailableProperties(
  _properties: PropertyRecord[],
) {
  return []
}
