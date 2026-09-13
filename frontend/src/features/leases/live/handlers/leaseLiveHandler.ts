import type { LeaseLiveEvent } from "../events/leaseLiveEvent"

export interface LeaseLiveHandler {
  handle(
    event: LeaseLiveEvent,
  ): void
}

export function createLeaseLiveHandler(
  handle: (
    event: LeaseLiveEvent,
  ) => void,
): LeaseLiveHandler {
  return {
    handle,
  }
}
