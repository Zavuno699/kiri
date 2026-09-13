import type {
  OperationalDevice,
} from "../../../domain/contracts"

export function deviceSummary(
  device: OperationalDevice,
) {
  return {
    id: device.id,
    propertyId: device.propertyId ?? "—",
    leaseId: device.leaseId ?? "—",
    status: device.status ?? "unknown",
    online:
      device.online === undefined
        ? "unknown"
        : device.online
          ? "online"
          : "offline",
    firmwareVersion:
      device.firmwareVersion ?? "—",
    lastSeenAt:
      device.lastSeenAt ?? "—",
  }
}
