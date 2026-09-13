import type { OperationalLock } from "../contracts"
import {
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalLock(
  value: Record<string, unknown>,
): OperationalLock {
  return {
    id: stringValue(value.id),
    deviceId: optionalString(
      value.deviceId ?? value.device_id,
    ),
    propertyId: optionalString(
      value.propertyId ?? value.property_id,
    ),
    status: optionalString(value.status),
    locked:
      typeof value.locked === "boolean"
        ? value.locked
        : undefined,
    mode: optionalString(value.mode),
    lastCommandAt: optionalString(
      value.lastCommandAt ??
      value.last_command_at,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}
