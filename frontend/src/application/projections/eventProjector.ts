import type {
  EventEnvelope,
} from "../../contracts/events/eventEnvelope"

export interface EventProjector<
  TEvent,
  TProjection,
> {
  supports(type: string): boolean
  project(
    event: EventEnvelope<TEvent>,
  ): TProjection
}
