export interface LeaseConfirmation {
  commandId: string
  required: boolean
  confirmed: boolean
  reason?: string
}

export function createLeaseConfirmation(
  commandId: string,
): LeaseConfirmation {
  return {
    commandId,
    required: true,
    confirmed: false,
    reason:
      false
        ? undefined
        : "Command capability is unavailable.",
  }
}
