import type {
  RuntimeAuditEvent,
} from "./runtimeAuditEvent";

const events: RuntimeAuditEvent[] = [];

export function recordRuntimeAuditEvent(
  event: RuntimeAuditEvent,
): void {
  events.push(event);

  if (events.length > 250) {
    events.shift();
  }
}

export function listRuntimeAuditEvents(): RuntimeAuditEvent[] {
  return [
    ...events,
  ];
}
