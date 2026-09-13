import type {
  EventDefinition,
} from "../contracts/eventDefinition";

const events = new Map<
  string,
  EventDefinition
>();

export function registerEvent(
  event: EventDefinition,
): void {
  events.set(
    event.id,
    event,
  );
}

export function getEvent(
  eventId: string,
): EventDefinition | null {
  return (
    events.get(eventId) ??
    null
  );
}

export function listEvents(): EventDefinition[] {
  return [
    ...events.values(),
  ];
}

export function listEventsByDomain(
  domain: string,
): EventDefinition[] {
  return listEvents().filter(
    (event) =>
      event.domain ===
      domain,
  );
}

export function findEventByType(
  eventType: string,
): EventDefinition | null {
  return (
    listEvents().find(
      (event) =>
        event.name ===
        eventType,
    ) ??
    null
  );
}
