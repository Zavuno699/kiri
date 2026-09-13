import type { EventDefinition } from "./eventDefinition";

const definitions = new Map<string, EventDefinition>();

export function registerEventDefinition(
  definition: EventDefinition,
): void {
  definitions.set(definition.eventType, definition);
}

export function getEventDefinition(
  eventType: string,
): EventDefinition | undefined {
  return definitions.get(eventType);
}

export function listEventDefinitions(): EventDefinition[] {
  return Array.from(definitions.values());
}
