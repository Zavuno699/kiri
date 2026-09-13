export type EventHandler<T> =
  (event: T) => void | Promise<void>

export interface EventSubscriber<T> {
  subscribe(
    type: string,
    handler: EventHandler<T>,
  ): () => void

  publish(
    type: string,
    event: T,
  ): Promise<void>
}
