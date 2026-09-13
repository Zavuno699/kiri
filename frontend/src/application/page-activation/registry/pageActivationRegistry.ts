import type { PageActivation } from "../pages/pageActivation"

export interface PageActivationRegistry {
  register(value: PageActivation): void
  get(pageId: string): PageActivation | undefined
  list(): PageActivation[]
}

export function createPageActivationRegistry():
  PageActivationRegistry {
  const values = new Map<string, PageActivation>()

  return {
    register(value) {
      values.set(value.page.id, value)
    },

    get(pageId) {
      return values.get(pageId)
    },

    list() {
      return [...values.values()]
    },
  }
}
