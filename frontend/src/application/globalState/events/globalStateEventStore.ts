import type {
  GlobalStateEvent,
} from "../contracts/stateEvent";

const events:
  GlobalStateEvent[] = [];

export function recordGlobalStateEvent(
  event: GlobalStateEvent,
): void {
  events.push(
    event,
  );

  if (
    events.length >
    1000
  ) {
    events.shift();
  }
}

export function listGlobalStateEvents(): GlobalStateEvent[] {
  return [
    ...events,
  ];
}

export function clearGlobalStateEvents(): void {
  events.length = 0;
}
