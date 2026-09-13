import {
  toOperationalLease,
} from "../../domain/compatibility"
import type { OperationalLease } from "../../domain/contracts"

export function normalizeLease(
  value: unknown,
): OperationalLease {
  return toOperationalLease(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
