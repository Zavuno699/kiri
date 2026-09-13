import type { LeaseEvent } from "../leaseEvent"

export interface LeaseEventHandler {
  handle(event: LeaseEvent): Promise<void>
}

export function createLeaseEventHandler(
  execute: (
    event: LeaseEvent,
  ) => Promise<unknown>,
): LeaseEventHandler {
  return {
    async handle(event) {
      await execute(event)
    },
  }
}
