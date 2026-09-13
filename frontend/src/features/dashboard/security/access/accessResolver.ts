export interface DashboardAccessState {
  read: boolean
  write: boolean
  reason: string | null
}

export function resolveDashboardAccess(): DashboardAccessState {
  return {
    read: true,
    write: false,
    reason: null,
  }
}
