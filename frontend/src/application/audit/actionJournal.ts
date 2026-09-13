import type { OperatorAction } from "./operatorAction"

export interface ActionJournal {
  record(action: OperatorAction): void
  list(): OperatorAction[]
}

export function createActionJournal(): ActionJournal {
  const actions: OperatorAction[] = []

  return {
    record(action) {
      actions.push(action)
    },

    list() {
      return [...actions]
    },
  }
}
