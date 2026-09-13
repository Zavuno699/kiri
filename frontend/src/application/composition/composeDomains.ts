import type { DomainModule } from "./domainModule"

export function composeDomains(
  modules: DomainModule[],
): DomainModule[] {
  return [...modules].sort((a, b) =>
    a.id.localeCompare(b.id),
  )
}
