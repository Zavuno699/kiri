import type { EventHandler } from "../contracts/eventHandler"

const registry = new Map<string, EventHandler>()

export function registerEventHandler(
  handler: EventHandler,
): void

export function registerEventHandler(
  eventType: string,
  handler: EventHandler,
): void

export function registerEventHandler(
  first: string | EventHandler,
  second?: EventHandler,
): void {
  const handler =
    typeof first === "string" ? second! : first

  const eventType =
    typeof first === "string"
      ? first
      : first.eventType

  registry.set(eventType, handler)
}

export function getEventHandler(
  eventType: string,
): EventHandler | undefined {
  return registry.get(eventType)
}

export function getEventHandlers(): EventHandler[] {
  return [...registry.values()]
}

export function listEventHandlers(): EventHandler[] {
  return [...registry.values()]
}
