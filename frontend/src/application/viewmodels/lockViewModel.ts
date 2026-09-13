import type {
  LockRecord,
} from "../../features/locks/types/lock"

export interface LockViewModel
  extends LockRecord {
  stateLabel: string
  readinessLabel: string
  batteryLabel: string
  commandReady: boolean
}

export function toLockViewModel(
  lock: LockRecord,
): LockViewModel {
  const commandReady =
    lock.readiness === "ready" &&
    lock.state !== "offline" &&
    lock.state !== "jammed"

  return {
    ...lock,
    stateLabel: lock.state ?? "Unknown",
    readinessLabel:
      lock.readiness ?? "Unknown",
    batteryLabel:
      lock.batteryPercent == null
        ? "Unknown"
        : `${lock.batteryPercent}%`,
    commandReady,
  }
}
