export interface RuntimeProvider<T> {
  id: string
  create(): T
  dispose(value: T): void
}
