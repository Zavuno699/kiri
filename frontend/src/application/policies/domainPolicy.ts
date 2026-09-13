export interface DomainPolicy {
  domain: string
  readable: boolean
  writable: boolean
  commandable: boolean
}

export function unavailableDomainPolicy(
  domain: string,
): DomainPolicy {
  return {
    domain,
    readable: false,
    writable: false,
    commandable: false,
  }
}
