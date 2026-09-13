export interface DashboardLocalProjection {
  id: string
  version: number
  updatedAt: string
}

export function createDashboardLocalProjection(
  id: string,
): DashboardLocalProjection {
  return {
    id,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
