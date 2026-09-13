export interface SecurityAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function resolveSecurityAccess(): SecurityAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
