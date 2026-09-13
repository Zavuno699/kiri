
import type { SecurityEvent } from "./securityEvent";

const events: SecurityEvent[] = [];

export function appendSecurityEvent(event: SecurityEvent): void {
  events.push(event);
}

export function listSecurityEvents(): SecurityEvent[] {
  return [...events];
}

