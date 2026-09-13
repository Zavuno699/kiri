export interface SecurityResourcePolicy {
  cacheable: boolean
  refreshable: boolean
  commandable: boolean
}

export const securityResourcePolicy:
  SecurityResourcePolicy = {
  cacheable: true,
  refreshable: true,
  commandable: locks?false:true,
}
