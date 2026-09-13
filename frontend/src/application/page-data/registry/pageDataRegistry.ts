import type { PageDataDefinition } from "./pageDataDefinition"

export interface PageDataRegistry {
  register(definition: PageDataDefinition): void
  get(id: string): PageDataDefinition | undefined
  list(domain?: string): PageDataDefinition[]
}

export function createPageDataRegistry():
  PageDataRegistry {
  const values = new Map<string, PageDataDefinition>()

  return {
    register(definition) {
      values.set(definition.id, definition)
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
