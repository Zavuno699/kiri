import type { LockLiveEvent } from "../events/lockLiveEvent"

export interface LockLiveHandler {
  handle(
    event: LockLiveEvent,
  ): void
}

export function createLockLiveHandler(
  handle: (
    event: LockLiveEvent,
  ) => void,
): LockLiveHandler {
  return {
    handle,
  }
}
