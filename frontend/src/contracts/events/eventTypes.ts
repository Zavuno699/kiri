export const eventTypes = {
  propertyCreated: "property.created",
  propertyUpdated: "property.updated",

  leaseCreated: "lease.created",
  leaseUpdated: "lease.updated",
  leaseStatusChanged: "lease.status.changed",
  leaseEntitlementChanged:
    "lease.entitlement.changed",

  paymentCreated: "payment.created",
  paymentSettled: "payment.settled",
  paymentFailed: "payment.failed",
  paymentReversed: "payment.reversed",

  deviceConnected: "device.connected",
  deviceDisconnected: "device.disconnected",
  deviceCommandCompleted:
    "device.command.completed",
  deviceCommandFailed:
    "device.command.failed",

  lockStateChanged: "lock.state.changed",
  lockCommand: "lock.command",
  lockCommandResult:
    "lock.command.result",

  accessGranted: "security.access.granted",
  accessDenied: "security.access.denied",
  accessRevoked: "security.access.revoked",
  freezeApplied: "security.freeze.applied",
  freezeReleased: "security.freeze.released",
} as const

export type EventType =
  typeof eventTypes[
    keyof typeof eventTypes
  ]
