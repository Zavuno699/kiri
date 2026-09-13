import type { RegistrationRegistry } from "./registrationRegistry"
import type { DomainModule } from "../composition/domainModule"

export function registerCoreDomains(
  registry: RegistrationRegistry,
  modules: DomainModule[],
): void {
  for (const module of modules) {
    registry.register({
      id: module.id,
      registered: true,
    })
  }
}
