export interface EventHandler<E = any> {
  eventType: string
  handle(event: E): Promise<void> | void
}
