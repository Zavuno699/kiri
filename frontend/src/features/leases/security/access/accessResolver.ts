export interface LeasesAccessState {
  read: boolean
  write: boolean
  reason: string | null
}

export function resolveLeasesAccess(): LeasesAccessState {
  return {
    read: true,
    write: false,
    reason: null,
  }
}
