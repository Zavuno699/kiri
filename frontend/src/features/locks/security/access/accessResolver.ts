export interface LocksAccessState {
  read: boolean
  write: boolean
  reason: string | null
}

export function resolveLocksAccess(): LocksAccessState {
  return {
    read: true,
    write: false,
    reason: null,
  }
}
