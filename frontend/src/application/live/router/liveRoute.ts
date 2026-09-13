import type { LiveEvent } from "../events/liveEvent"

export interface LiveRoute {
  id: string
  domain?: string
  eventType?: string
  handle(
    event: LiveEvent,
  ): void
}
