import type { PropertyLiveEvent } from "../events/propertyLiveEvent"

export interface PropertyLiveHandler {
  handle(
    event: PropertyLiveEvent,
  ): void
}

export function createPropertyLiveHandler(
  handle: (
    event: PropertyLiveEvent,
  ) => void,
): PropertyLiveHandler {
  return {
    handle,
  }
}
