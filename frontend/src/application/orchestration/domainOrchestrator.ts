export interface DomainOrchestrator {
  readonly domain: string
  readonly refresh?: () => Promise<unknown>
  readonly inspect?: (id: string) => Promise<unknown>
}

export function createDomainOrchestrator(
  domain: string,
  refresh?: () => Promise<unknown>,
  inspect?: (id: string) => Promise<unknown>,
): DomainOrchestrator {
  return { domain, refresh, inspect }
}
