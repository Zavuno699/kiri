import type { OperatorWorkspaceDefinition } from "./operatorWorkspaceDefinition"

export interface OperatorWorkspaceRegistry {
  register(value: OperatorWorkspaceDefinition): void
  get(id: string): OperatorWorkspaceDefinition | undefined
  list(): OperatorWorkspaceDefinition[]
}

export function createOperatorWorkspaceRegistry():
  OperatorWorkspaceRegistry {
  const values = new Map<string, OperatorWorkspaceDefinition>()

  return {
    register(value) {
      values.set(value.id, value)
    },

    get(id) {
      return values.get(id)
    },

    list() {
      return [...values.values()]
    },
  }
}
