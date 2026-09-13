export interface LockNotificationPolicy {
  reportFailures: boolean
  reportBlocks: boolean
  reportSuccess: boolean
}

export const lockNotificationPolicy:
  LockNotificationPolicy = {
  reportFailures: true,
  reportBlocks: true,
  reportSuccess: true,
}
