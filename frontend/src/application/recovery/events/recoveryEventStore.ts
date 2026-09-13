import type { RecoveryEvent } from "./recoveryEvent";

const events: RecoveryEvent[] = [];

export function appendRecoveryEvent(
  event: RecoveryEvent,
): void {
  events.push(event);
}

export function listRecoveryEvents(): RecoveryEvent[] {
  return [...events];
}
