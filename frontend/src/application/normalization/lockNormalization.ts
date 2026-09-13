import {
  toOperationalLock,
} from "../../domain/compatibility"
import type { OperationalLock } from "../../domain/contracts"

export function normalizeLock(
  value: unknown,
): OperationalLock {
  return toOperationalLock(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
