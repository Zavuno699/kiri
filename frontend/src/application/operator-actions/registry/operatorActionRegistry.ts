import type { OperatorActionDefinition } from "../operatorActionDefinition"

export interface OperatorActionRegistry {
  register(value: OperatorActionDefinition): void
  get(id: string): OperatorActionDefinition | undefined
  list(domain?: string): OperatorActionDefinition[]
}

export function createOperatorActionRegistry():
  OperatorActionRegistry {
  const values = new Map<
    string,
    OperatorActionDefinition
  >()

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
