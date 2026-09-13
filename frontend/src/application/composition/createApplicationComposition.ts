import type { ApplicationComposition } from "./applicationComposition"
import type { DomainModule } from "./domainModule"

export function createApplicationComposition(
  modules: DomainModule[],
): ApplicationComposition {
  return {
    modules,
    initialized: false,
  }
}
