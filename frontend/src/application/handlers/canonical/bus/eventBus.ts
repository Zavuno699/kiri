import { getEventHandlers } from "../registry/eventHandlerRegistry"

export async function publishEvent(event: {
  type?: string
  eventType?: string
  [key: string]: unknown
}): Promise<void> {
  const type = event.type ?? event.eventType ?? ""

  for (const handler of getEventHandlers()) {
    if (handler.eventType !== type) continue
    await handler.handle(event)
  }
}
