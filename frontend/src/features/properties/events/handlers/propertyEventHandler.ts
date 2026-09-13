import type { PropertyEvent } from "../propertyEvent"

export interface PropertyEventHandler {
  handle(event: PropertyEvent): Promise<void>
}

export function createPropertyEventHandler(
  execute: (
    event: PropertyEvent,
  ) => Promise<unknown>,
): PropertyEventHandler {
  return {
    async handle(event) {
      await execute(event)
    },
  }
}
