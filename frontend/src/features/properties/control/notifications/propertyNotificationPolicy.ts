export interface PropertyNotificationPolicy {
  reportFailures: boolean
  reportBlocks: boolean
  reportSuccess: boolean
}

export const propertyNotificationPolicy:
  PropertyNotificationPolicy = {
  reportFailures: true,
  reportBlocks: true,
  reportSuccess: true,
}
