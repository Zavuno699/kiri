export interface DomainProvider {
  id: "domain"
  ready: boolean
}

export const domainProvider: DomainProvider = {
  id: "domain",
  ready: false,
}
