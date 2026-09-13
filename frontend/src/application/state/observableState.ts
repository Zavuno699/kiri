export type StateListener<T> =
  (state: T) => void

export class ObservableState<T> {
  private state: T
  private readonly listeners =
    new Set<StateListener<T>>()

  constructor(initial: T) {
    this.state = initial
  }

  get(): T {
    return this.state
  }

  set(next: T): void {
    this.state = next

    for (const listener of this.listeners) {
      listener(this.state)
    }
  }

  update(
    updater: (current: T) => T,
  ): void {
    this.set(updater(this.state))
  }

  subscribe(
    listener: StateListener<T>,
  ): () => void {
    this.listeners.add(listener)

    return () =>
      this.listeners.delete(listener)
  }
}
