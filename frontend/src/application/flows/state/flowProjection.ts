export interface FlowProjection<TState = unknown> {
  key: string
  state: TState
}

export function flowProjection<TState>(
  key: string,
  state: TState,
): FlowProjection<TState> {
  return { key, state }
}
