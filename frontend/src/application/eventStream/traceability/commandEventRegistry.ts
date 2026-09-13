import type {
  CommandEventLink,
} from "../contracts/commandEventLink";

const links = new Map<
  string,
  CommandEventLink
>();

export function registerCommandEventLink(
  link: CommandEventLink,
): void {
  links.set(
    link.id,
    link,
  );
}

export function listCommandEventLinks(): CommandEventLink[] {
  return [
    ...links.values(),
  ];
}

export function listEventsForCommand(
  commandId: string,
): CommandEventLink[] {
  return listCommandEventLinks().filter(
    (link) =>
      link.commandId ===
      commandId,
  );
}

export function listCommandsForEvent(
  eventType: string,
): CommandEventLink[] {
  return listCommandEventLinks().filter(
    (link) =>
      link.eventType ===
      eventType,
  );
}
