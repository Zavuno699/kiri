import type { LockRecord } from "../types/lock"

export interface LockOperationalProjection {
  total: number
  locked: number
  unlocked: number
  blocked: number
  jammed: number
  lowBattery: number
  commandReady: number
}

export function projectLockOperations(
  locks: LockRecord[],
): LockOperationalProjection {
  return {
    total: locks.length,

    locked: locks.filter(
      (lock) =>
        lock.state === "locked",
    ).length,

    unlocked: locks.filter(
      (lock) =>
        lock.state === "unlocked",
    ).length,

    blocked: locks.filter(
      (lock) =>
        lock.readiness === "blocked",
    ).length,

    jammed: locks.filter(
      (lock) =>
        lock.state === "jammed",
    ).length,

    lowBattery: locks.filter(
      (lock) =>
        lock.batteryPercent != null &&
        lock.batteryPercent <= 20,
    ).length,

    commandReady: locks.filter(
      (lock) =>
        lock.readiness === "ready" &&
        lock.state !== "offline" &&
        lock.state !== "jammed",
    ).length,
  }
}
