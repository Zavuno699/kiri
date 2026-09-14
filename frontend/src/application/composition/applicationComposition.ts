import type { DomainModule } from "./domainModule"

export interface ApplicationComposition {
  modules: DomainModule[]
  initialized: boolean
}

export function createApplicationComposition(
  modules: DomainModule[],
): ApplicationComposition {
  return {
    modules,
    initialized: false,
  }
}
