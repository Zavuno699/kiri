export interface DomainDescriptor {
  id: string
  label: string
  route: string
  enabled: boolean
  readOnly: boolean
}

export function createDomainDescriptor(
  value: DomainDescriptor,
): DomainDescriptor {
  return { ...value }
}
