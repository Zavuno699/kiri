import type { RuntimeProvider } from "./runtimeProvider"

export interface ProviderRegistry {
  register<T>(provider: RuntimeProvider<T>): void
  list(): RuntimeProvider<unknown>[]
}

export function createProviderRegistry(): ProviderRegistry {
  const values: RuntimeProvider<unknown>[] = []

  return {
    register<T>(provider: RuntimeProvider<T>) {
      values.push(provider as RuntimeProvider<unknown>)
    },

    list() {
      return [...values]
    },
  }
}
