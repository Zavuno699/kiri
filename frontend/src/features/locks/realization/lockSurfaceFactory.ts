import type {
  OperationalLock,
} from "../../../domain/contracts"
import { lockSummary } from "../presentation/LockSummary"

export function createLockSurface(
  lock?: OperationalLock,
) {
  return lock
    ? lockSummary(lock)
    : undefined
}
