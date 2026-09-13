import {
  toOperationalPayment,
} from "../../domain/compatibility"
import type { OperationalPayment } from "../../domain/contracts"

export function normalizePayment(
  value: unknown,
): OperationalPayment {
  return toOperationalPayment(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
