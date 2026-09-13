export interface DomainOperationPolicy {
  domain: string
  canRead: boolean
  canRefresh: boolean
  canCommand: boolean
  canMutate: boolean
  reason?: string
}
