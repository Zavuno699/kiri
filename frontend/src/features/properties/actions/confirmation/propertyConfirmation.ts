export interface PropertyConfirmation {
  commandId: string
  required: boolean
  confirmed: boolean
  reason?: string
}

export function createPropertyConfirmation(
  commandId: string,
): PropertyConfirmation {
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
