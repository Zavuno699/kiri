export interface DashboardConfirmation {
  commandId: string
  required: boolean
  confirmed: boolean
  reason?: string
}

export function createDashboardConfirmation(
  commandId: string,
): DashboardConfirmation {
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
