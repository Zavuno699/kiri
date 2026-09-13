import {
  buildLockViewModel,
} from "../models/lockViewModel"

export function presentLock(
  lock: Parameters<
    typeof buildLockViewModel
  >[0],
) {
  return buildLockViewModel(lock)
}
