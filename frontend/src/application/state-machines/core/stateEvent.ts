export interface StateEvent<T = unknown> {
  type: string
  payload?: T
  occurredAt: string
}
