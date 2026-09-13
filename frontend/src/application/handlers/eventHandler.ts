import type {
  EventEnvelope,
} from "../../contracts/events/eventEnvelope"

export interface EventHandler<T = unknown> {
  supports(type: string): boolean
  handle(
    event: EventEnvelope<T>,
  ): Promise<void>
}
