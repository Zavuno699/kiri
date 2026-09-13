export interface DomainEvent<T = unknown> {
  type: string
  payload: T
  occurredAt: string
  correlationId?: string
}

type EventHandler<T = unknown> =
  (event: DomainEvent<T>) =>
    void | Promise<void>

export class ApplicationEventBus {
  private readonly handlers =
    new Map<
      string,
      Set<EventHandler>
    >()

  subscribe<T>(
    type: string,
    handler: EventHandler<T>,
  ): () => void {
    const current =
      this.handlers.get(type) ??
      new Set<EventHandler>()

    current.add(
      handler as EventHandler,
    )

    this.handlers.set(type, current)

    return () => {
      current.delete(
        handler as EventHandler,
      )

      if (!current.size) {
        this.handlers.delete(type)
      }
    }
  }

  async publish<T>(
    event: DomainEvent<T>,
  ): Promise<void> {
    const handlers =
      this.handlers.get(event.type)

    if (!handlers) return

    for (const handler of handlers) {
      await handler(event)
    }
  }
}

export const applicationEventBus =
  new ApplicationEventBus()
