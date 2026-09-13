export interface DomainRuntime {
  readonly domain: string
  readonly available: boolean
  readonly degraded: boolean
  readonly reason?: string
}

export function createDomainRuntime(
  domain: string,
  available: boolean,
  reason?: string,
): DomainRuntime {
  return {
    domain,
    available,
    degraded: !available,
    reason,
  }
}
