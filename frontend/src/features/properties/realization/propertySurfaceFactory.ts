import type {
  OperationalProperty,
} from "../../../domain/contracts"
import {
  propertySummary,
} from "../presentation/PropertySummary"

export function createPropertySurface(
  property?: OperationalProperty,
) {
  return property
    ? propertySummary(property)
    : undefined
}
