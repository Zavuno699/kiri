import type {
  LiveEvent,
} from "../events/liveEvent"
import type {
  LiveSubscriber,
  LiveSubscription,
} from "./liveSubscription"

export interface LiveEventBus {
  subscribe(
    subscriber: LiveSubscriber,
  ): LiveSubscription

  publish(event: LiveEvent): void
}

export function createLiveEventBus():
  LiveEventBus {
  const subscribers =
    new Map<string, LiveSubscriber>()

  return {
    subscribe(subscriber) {
      const id =
        globalThis.crypto?.randomUUID?.() ??
        `${Date.now()}-${Math.random()}`

      subscribers.set(id, subscriber)

      return {
        id,
        unsubscribe() {
          subscribers.delete(id)
        },
      }
    },

    publish(event) {
      for (const subscriber of subscribers.values()) {
        subscriber(event)
      }
    },
  }
}
