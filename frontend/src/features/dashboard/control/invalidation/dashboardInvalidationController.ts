export interface DashboardInvalidationController {
  invalidate(
    id?: string,
    reason?: string,
  ): void
}

export function createDashboardInvalidationController(
  invalidate: (
    id?: string,
    reason?: string,
  ) => void,
): DashboardInvalidationController {
  return {
    invalidate,
  }
}
