import type {
  EventProjectionLink,
} from "../contracts/eventProjectionLink";

const links = new Map<
  string,
  EventProjectionLink
>();

export function registerEventProjectionLink(
  link: EventProjectionLink,
): void {
  links.set(
    link.id,
    link,
  );
}

export function listEventProjectionLinks(): EventProjectionLink[] {
  return [
    ...links.values(),
  ];
}

export function listProjectionsForEvent(
  eventType: string,
): EventProjectionLink[] {
  return listEventProjectionLinks().filter(
    (link) =>
      link.eventType ===
      eventType,
  );
}

export function listEventsForProjection(
  projectionId: string,
): EventProjectionLink[] {
  return listEventProjectionLinks().filter(
    (link) =>
      link.projectionId ===
      projectionId,
  );
}
