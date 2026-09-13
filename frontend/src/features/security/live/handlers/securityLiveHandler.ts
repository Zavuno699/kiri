import type { SecurityLiveEvent } from "../events/securityLiveEvent"

export interface SecurityLiveHandler {
  handle(
    event: SecurityLiveEvent,
  ): void
}

export function createSecurityLiveHandler(
  handle: (
    event: SecurityLiveEvent,
  ) => void,
): SecurityLiveHandler {
  return {
    handle,
  }
}
