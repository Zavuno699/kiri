import type { OperationalDevice } from "../contracts"
import {
  optionalString,
  stringValue,
} from "../normalization"

export function toOperationalDevice(
  value: Record<string, unknown>,
): OperationalDevice {
  const online =
    typeof value.online === "boolean"
      ? value.online
      : typeof value.connected === "boolean"
        ? value.connected
        : undefined

  return {
    id: stringValue(value.id),
    propertyId: optionalString(
      value.propertyId ?? value.property_id,
    ),
    leaseId: optionalString(
      value.leaseId ?? value.lease_id,
    ),
    status: optionalString(value.status),
    online,
    firmwareVersion: optionalString(
      value.firmwareVersion ??
      value.firmware_version,
    ),
    lastSeenAt: optionalString(
      value.lastSeenAt ??
      value.last_seen_at,
    ),
    metadata:
      value.metadata &&
      typeof value.metadata === "object"
        ? value.metadata as Record<string, unknown>
        : undefined,
  }
}
