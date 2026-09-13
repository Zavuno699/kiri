import {
  toOperationalProperty,
} from "../../domain/compatibility"
import type { OperationalProperty } from "../../domain/contracts"

export function normalizeProperty(
  value: unknown,
): OperationalProperty {
  return toOperationalProperty(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
