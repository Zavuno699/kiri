export interface SecurityConfirmation {
  commandId: string
  required: boolean
  confirmed: boolean
  reason?: string
}

export function createSecurityConfirmation(
  commandId: string,
): SecurityConfirmation {
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
