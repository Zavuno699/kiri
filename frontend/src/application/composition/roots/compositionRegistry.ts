import type { CompositionRoot } from "./compositionRoot"

export interface CompositionRegistry {
  register(root: CompositionRoot): void
  get(id: string): CompositionRoot | undefined
  list(): CompositionRoot[]
}

export function createCompositionRegistry():
  CompositionRegistry {
  const values = new Map<string, CompositionRoot>()

  return {
    register(root) {
      values.set(root.id, root)
    },

    get(id) {
      return values.get(id)
    },

    list() {
      return [...values.values()]
    },
  }
}
