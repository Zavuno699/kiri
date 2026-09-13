export interface SecurityServicePolicy {
  readable: boolean
  refreshable: boolean
  commandable: boolean
}

export const securityServicePolicy:
  SecurityServicePolicy = {
  readable: true,
  refreshable: true,
  commandable: false,
}
