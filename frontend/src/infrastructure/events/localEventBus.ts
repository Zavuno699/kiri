import type {
  EventHandler,
  EventSubscriber,
} from "./eventSubscriber"

export class LocalEventBus<T>
  implements EventSubscriber<T>
{
  private readonly handlers =
    new Map<
      string,
      Set<EventHandler<T>>
    >()

  subscribe(
    type: string,
    handler: EventHandler<T>,
  ): () => void {
    const current =
      this.handlers.get(type) ??
      new Set<EventHandler<T>>()

    current.add(handler)
    this.handlers.set(type, current)

    return () => {
      current.delete(handler)

      if (!current.size) {
        this.handlers.delete(type)
      }
    }
  }

  async publish(
    type: string,
    event: T,
  ): Promise<void> {
    const handlers =
      this.handlers.get(type)

    if (!handlers) return

    await Promise.all(
      Array.from(handlers).map(
        (handler) => handler(event),
      ),
    )
  }
}

export const localEventBus =
  new LocalEventBus<unknown>()
