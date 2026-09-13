import type { PageDefinition } from "../pages/pageDefinition"

export interface PageRegistry {
  register(page: PageDefinition): void
  get(id: string): PageDefinition | undefined
  resolve(route: string): PageDefinition | undefined
  list(domain?: string): PageDefinition[]
}

export function createPageRegistry(): PageRegistry {
  const values = new Map<string, PageDefinition>()

  return {
    register(page) {
      values.set(page.id, page)
    },

    get(id) {
      return values.get(id)
    },

    resolve(route) {
      return [...values.values()].find(
        (item) => item.route === route && item.enabled,
      )
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
