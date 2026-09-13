import type { SecurityEvent } from "../securityEvent"

export interface SecurityEventHandler {
  handle(event: SecurityEvent): Promise<void>
}

export function createSecurityEventHandler(
  execute: (
    event: SecurityEvent,
  ) => Promise<unknown>,
): SecurityEventHandler {
  return {
    async handle(event) {
      await execute(event)
    },
  }
}
