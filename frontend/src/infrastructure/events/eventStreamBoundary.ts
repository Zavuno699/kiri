import type {
  EventEnvelope,
} from "./eventEnvelope"

export interface EventStreamBoundary {
  readonly available: boolean

  subscribe(
    handler: (
      event: EventEnvelope,
    ) => void,
  ): () => void
}

export const unavailableEventStream:
  EventStreamBoundary = {
    available: false,

    subscribe() {
      return () => undefined
    },
  }
