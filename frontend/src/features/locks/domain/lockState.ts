import type { OperationalLock } from "../../../domain/contracts"

export function lockIsEngaged(
  lock: OperationalLock,
): boolean {
  if (lock.locked !== undefined) {
    return lock.locked
  }

  return lock.status?.toLowerCase() === "locked"
}
