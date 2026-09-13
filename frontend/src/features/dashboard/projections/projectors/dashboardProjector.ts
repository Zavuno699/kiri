export interface DashboardProjector<T> {
  project(event: T): unknown
}

export function createDashboardProjector<T>(
  project: (event: T) => unknown,
): DashboardProjector<T> {
  return {
    project,
  }
}
