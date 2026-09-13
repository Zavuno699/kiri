export interface LeaseNotificationPolicy {
  reportFailures: boolean
  reportBlocks: boolean
  reportSuccess: boolean
}

export const leaseNotificationPolicy:
  LeaseNotificationPolicy = {
  reportFailures: true,
  reportBlocks: true,
  reportSuccess: true,
}
