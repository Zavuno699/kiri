export interface DomainServiceRegistration {
  domain: string
  initialized: boolean
  readOnly: boolean
}

export function createDomainServiceRegistry() {
  return new Map<
    string,
    DomainServiceRegistration
  >()
}
