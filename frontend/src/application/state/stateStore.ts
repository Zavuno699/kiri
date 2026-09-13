import type { LocalState } from "./localState"

export interface StateStore<T> {
  get(): LocalState<T> | undefined
  set(value: T): LocalState<T>
  clear(): void
}

export function createStateStore<T>(): StateStore<T> {
  let state: LocalState<T> | undefined

  return {
    get() {
      return state
    },

    set(value) {
      state = {
        value,
        version: (state?.version ?? 0) + 1,
        updatedAt: new Date().toISOString(),
      }

      return state
    },

    clear() {
      state = undefined
    },
  }
}
