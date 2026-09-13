export interface LockResourcePolicy {
  cacheable: boolean
  refreshable: boolean
  commandable: boolean
}

export const lockResourcePolicy:
  LockResourcePolicy = {
  cacheable: true,
  refreshable: true,
  commandable: true,
}
