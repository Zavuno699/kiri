export interface LeaseResourcePolicy {
  cacheable: boolean
  refreshable: boolean
  commandable: boolean
}

export const leaseResourcePolicy:
  LeaseResourcePolicy = {
  cacheable: true,
  refreshable: true,
  commandable: true,
}
