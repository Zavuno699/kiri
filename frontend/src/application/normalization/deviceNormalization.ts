import {
  toOperationalDevice,
} from "../../domain/compatibility"
import type { OperationalDevice } from "../../domain/contracts"

export function normalizeDevice(
  value: unknown,
): OperationalDevice {
  return toOperationalDevice(
    value && typeof value === "object"
      ? value as Record<string, unknown>
      : {},
  )
}
