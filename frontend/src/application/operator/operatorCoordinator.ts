import type {
  OperatorEntityReference,
} from "./entityRegistry"

export interface OperatorCoordinator {
  select(entity: OperatorEntityReference): void
  clear(): void
  getSelection(): OperatorEntityReference | null
}

export function createOperatorCoordinator():
  OperatorCoordinator {
  let selection:
    | OperatorEntityReference
    | null = null

  return {
    select(entity) {
      selection = entity
    },

    clear() {
      selection = null
    },

    getSelection() {
      return selection
    },
  }
}
