export interface LocksAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function getLocksAccessState(): LocksAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
