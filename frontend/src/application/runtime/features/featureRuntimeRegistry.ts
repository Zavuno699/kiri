import type { FeatureRuntime } from "./featureRuntime"

export interface FeatureRuntimeRegistry {
  register(runtime: FeatureRuntime): void
  get(id: string): FeatureRuntime | undefined
  list(): FeatureRuntime[]
}

export function createFeatureRuntimeRegistry(): FeatureRuntimeRegistry {
  const values = new Map<string, FeatureRuntime>()

  return {
    register(runtime) {
      values.set(runtime.id, runtime)
    },

    get(id) {
      return values.get(id)
    },

    list() {
      return [...values.values()]
    },
  }
}
