export interface DomainCapability {
  id: string
  label: string
  enabled: boolean
  verified: boolean
  reason?: string
}

export function createDomainCapability(
  id: string,
  label: string,
  enabled: boolean,
  verified: boolean,
  reason?: string,
): DomainCapability {
  return {
    id,
    label,
    enabled,
    verified,
    reason,
  }
}
