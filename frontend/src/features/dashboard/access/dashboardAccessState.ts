export interface DashboardAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function getDashboardAccessState(): DashboardAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
