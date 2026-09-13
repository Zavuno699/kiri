import type { OperationalProperty } from "../contracts"
import {
  numberValue,
  optionalNumber,
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalProperty(
  value: Record<string, unknown>,
): OperationalProperty {
  const totalUnits =
    optionalNumber(value.totalUnits) ??
    optionalNumber(value.units) ??
    optionalNumber(value.capacity)

  const availableUnits =
    optionalNumber(value.availableUnits) ??
    optionalNumber(value.available)

  const occupancy =
    optionalNumber(value.occupancy) ??
    (
      totalUnits !== undefined &&
      availableUnits !== undefined &&
      totalUnits > 0
        ? ((totalUnits - availableUnits) / totalUnits) * 100
        : undefined
    )

  return {
    id: stringValue(value.id),
    name: stringValue(
      value.name ?? value.propertyName,
      "Unknown property",
    ),
    status: optionalString(value.status),
    occupancy,
    availableUnits,
    totalUnits,
    address: optionalString(value.address),
    currency: optionalString(value.currency),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}

export function propertyOccupancy(
  value: Record<string, unknown>,
): number {
  return numberValue(
    toOperationalProperty(value).occupancy,
  )
}
