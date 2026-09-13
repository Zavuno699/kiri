import type { LiveEvent } from "../events/liveEvent"

export type LiveSubscriber =
  (event: LiveEvent) => void

export interface LiveSubscription {
  id: string
  unsubscribe(): void
}
