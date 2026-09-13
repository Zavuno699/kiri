export interface Reducer<S, E> {
  reduce(state: S, event: E): S
}
