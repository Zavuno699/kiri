export interface CommandAvailability {
  visible: boolean
  enabled: boolean
  reason?: string
}

export function unavailableCommand(
  reason: string,
): CommandAvailability {
  return {
    visible: true,
    enabled: false,
    reason,
  }
}
