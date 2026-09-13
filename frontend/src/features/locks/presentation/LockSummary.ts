import type {
  OperationalLock,
} from "../../../domain/contracts"

export function lockSummary(
  lock: OperationalLock,
) {
  return {
    id: lock.id,
    deviceId: lock.deviceId ?? "—",
    propertyId: lock.propertyId ?? "—",
    status: lock.status ?? "unknown",
    locked:
      lock.locked === undefined
        ? "unknown"
        : lock.locked
          ? "locked"
          : "unlocked",
    mode: lock.mode ?? "—",
    lastCommandAt:
      lock.lastCommandAt ?? "—",
  }
}
