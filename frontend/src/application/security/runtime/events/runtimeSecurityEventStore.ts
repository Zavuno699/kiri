import type { RuntimeSecurityEvent } from "./runtimeSecurityEvent";

const events: RuntimeSecurityEvent[] = [];

export function appendRuntimeSecurityEvent(
  event: RuntimeSecurityEvent,
): void {
  events.push(event);
}

export function listRuntimeSecurityEvents(): RuntimeSecurityEvent[] {
  return [...events];
}
