export interface LockConfirmation {
  commandId: string
  required: boolean
  confirmed: boolean
  reason?: string
}

export function createLockConfirmation(
  commandId: string,
): LockConfirmation {
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
