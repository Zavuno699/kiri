import type { OperatorSurface } from "./operatorSurface"

export interface OperatorSurfaceRegistry {
  register(value: OperatorSurface): void
  get(id: string): OperatorSurface | undefined
  list(domain?: string): OperatorSurface[]
}

export function createOperatorSurfaceRegistry():
  OperatorSurfaceRegistry {
  const values = new Map<string, OperatorSurface>()

  return {
    register(value) {
      values.set(value.id, value)
    },

    get(id) {
      return values.get(id)
    },

    list(domain) {
      const all = [...values.values()]
      return domain
        ? all.filter(
            (item) => item.domain === domain,
          )
        : all
    },
  }
}
