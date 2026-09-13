import type { EventLifecycle } from "./eventLifecycle"

export interface EventCheckpoint {
  eventId: string
  state: EventLifecycle
  updatedAt: string
}
