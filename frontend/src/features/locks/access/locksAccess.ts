import {
  getLocksAccessState,
} from "./locksAccessState"

export function canReadLocks(): boolean {
  return getLocksAccessState().readable
}

export function canWriteLocks(): boolean {
  return getLocksAccessState().writable
}
