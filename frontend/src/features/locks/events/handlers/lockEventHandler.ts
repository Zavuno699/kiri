import type { LockEvent } from "../lockEvent"

export interface LockEventHandler {
  handle(event: LockEvent): Promise<void>
}

export function createLockEventHandler(
  execute: (
    event: LockEvent,
  ) => Promise<unknown>,
): LockEventHandler {
  return {
    async handle(event) {
      await execute(event)
    },
  }
}
