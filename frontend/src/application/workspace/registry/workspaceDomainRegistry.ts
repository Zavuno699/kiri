export interface WorkspaceDomain {
  key: string
  label?: string
  enabled?: boolean
}

const registry = new Map<string, WorkspaceDomain>()

export function registerWorkspaceDomain(
  domain: WorkspaceDomain,
): WorkspaceDomain {
  registry.set(domain.key, domain)
  return domain
}

export function listWorkspaceDomains(): WorkspaceDomain[] {
  return [...registry.values()]
}
