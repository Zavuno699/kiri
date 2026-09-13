export interface LeasesAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function resolveLeasesAccess(): LeasesAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
