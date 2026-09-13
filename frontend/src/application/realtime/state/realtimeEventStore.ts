import type {
  RealtimeEvent,
} from "../contracts/realtimeEvent";

const events: RealtimeEvent[] = [];

export function recordRealtimeEvent(
  event: RealtimeEvent,
): void {
  events.push(event);

  if (events.length > 500) {
    events.shift();
  }
}

export function listRealtimeEvents(): RealtimeEvent[] {
  return [...events];
}

export function clearRealtimeEvents(): void {
  events.length = 0;
}
