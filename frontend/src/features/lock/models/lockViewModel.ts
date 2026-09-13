export interface LockViewModel {
  id: string
  name: string
  state: string
  readiness: string
  battery: string
  commandReady: boolean
}

export function buildLockViewModel(
  lock: {
    id: string
    name: string
    state: string
    readiness: string
    batteryPercent?: number
  },
): LockViewModel {
  return {
    id: lock.id,
    name: lock.name,
    state: lock.state,
    readiness: lock.readiness,
    battery:
      lock.batteryPercent == null
        ? "Unknown"
        : `${lock.batteryPercent}%`,
    commandReady:
      lock.readiness === "ready" &&
      lock.state !== "jammed" &&
      lock.state !== "offline",
  }
}
