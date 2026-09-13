import {
  toOperationalSecurity,
} from "../../domain/compatibility"
import type { OperationalSecurity } from "../../domain/contracts"

export function normalizeSecurity(
  value: unknown,
): OperationalSecurity {
  return toOperationalSecurity(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
