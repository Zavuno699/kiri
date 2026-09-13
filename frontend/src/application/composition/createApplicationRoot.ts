import { createDomainModuleRegistry } from "./domainModuleRegistry"
import { createDomainModules } from "./createDomainModules"

export function createApplicationRoot() {
  const registry = createDomainModuleRegistry()

  for (const module of createDomainModules()) {
    registry.register(module)
  }

  return {
    domains: registry,
  }
}
