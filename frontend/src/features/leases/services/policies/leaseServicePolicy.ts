export interface LeaseServicePolicy {
  readable: boolean
  refreshable: boolean
  commandable: boolean
}

export const leaseServicePolicy:
  LeaseServicePolicy = {
  readable: true,
  refreshable: true,
  commandable: true,
}
