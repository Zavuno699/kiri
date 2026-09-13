import type { LockRecord } from "../types/lock"

export function selectLocked(
  locks: LockRecord[],
) {
  return locks.filter(
    (lock) => lock.state === "locked",
  )
}

export function selectUnlocked(
  locks: LockRecord[],
) {
  return locks.filter(
    (lock) => lock.state === "unlocked",
  )
}

export function selectBlockedLocks(
  locks: LockRecord[],
) {
  return locks.filter(
    (lock) =>
      lock.readiness === "blocked" ||
      lock.state === "jammed",
  )
}

export function selectLowBatteryLocks(
  locks: LockRecord[],
  threshold = 20,
) {
  return locks.filter(
    (lock) =>
      lock.batteryPercent != null &&
      lock.batteryPercent <= threshold,
  )
}
