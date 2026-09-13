import type { DomainDescriptor } from "./domainDescriptor"

export interface DomainRegistry {
  register(domain: DomainDescriptor): void
  get(id: string): DomainDescriptor | undefined
  all(): DomainDescriptor[]
}

export function createDomainRegistry(): DomainRegistry {
  const values = new Map<string, DomainDescriptor>()

  return {
    register(domain) {
      values.set(domain.id, domain)
    },
    get(id) {
      return values.get(id)
    },
    all() {
      return [...values.values()]
    },
  }
}
