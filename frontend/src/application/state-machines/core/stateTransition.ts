export interface StateTransition<S, E = unknown> {
  from: S
  event: string
  to: S
  guard?: (event: E) => boolean
}
