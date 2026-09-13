export interface LocksAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function resolveLocksAccess(): LocksAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
