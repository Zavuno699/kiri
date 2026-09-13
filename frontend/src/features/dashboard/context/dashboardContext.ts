export interface DashboardContext {
  domain: "dashboard"
  entityId?: string
  correlationId?: string
  readOnly: boolean
}

export function createDashboardContext(
  entityId?: string,
): DashboardContext {
  return {
    domain: "dashboard",
    entityId,
    readOnly: true,
  }
}
