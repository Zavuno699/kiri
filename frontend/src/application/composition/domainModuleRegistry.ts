import type { DomainModule } from "./domainModule"

export interface DomainModuleRegistry {
  register(module: DomainModule): void
  get(id: string): DomainModule | undefined
  list(): DomainModule[]
}

export function createDomainModuleRegistry(): DomainModuleRegistry {
  const modules = new Map<string, DomainModule>()

  return {
    register(module) {
      modules.set(module.id, module)
    },

    get(id) {
      return modules.get(id)
    },

    list() {
      return [...modules.values()]
    },
  }
}
