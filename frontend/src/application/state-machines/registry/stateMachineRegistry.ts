import type { StateMachineDefinition } from "./stateMachineDefinition"

export interface StateMachineRegistry {
  register(machine: StateMachineDefinition): void
  get(id: string): StateMachineDefinition | undefined
  list(): StateMachineDefinition[]
}

export function createStateMachineRegistry(): StateMachineRegistry {
  const values = new Map<string, StateMachineDefinition>()

  return {
    register(machine) {
      values.set(machine.id, machine)
    },

    get(id) {
      return values.get(id)
    },

    list() {
      return [...values.values()]
    },
  }
}
