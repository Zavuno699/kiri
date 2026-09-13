export interface WorkspaceDomain {
  key: string
  label?: string
  enabled?: boolean
}

const domains = new Map<string, WorkspaceDomain>()

export function registerWorkspaceDomain(domain: WorkspaceDomain): WorkspaceDomain {
  domains.set(domain.key, domain)
  return domain
}

export function listWorkspaceDomains(): WorkspaceDomain[] {
  return [...domains.values()]
}

export function getWorkspaceDomain(key: string): WorkspaceDomain | undefined {
  return domains.get(key)
}
