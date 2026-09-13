import type { QueryDescriptor } from "./queryDescriptor"

export interface QueryRegistry {
  register(value: QueryDescriptor): void
  get(id: string): QueryDescriptor | undefined
  list(domain?: string): QueryDescriptor[]
}

export function createQueryRegistry(): QueryRegistry {
  const values = new Map<string, QueryDescriptor>()

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
        ? all.filter((item) => item.domain === domain)
        : all
    },
  }
}
