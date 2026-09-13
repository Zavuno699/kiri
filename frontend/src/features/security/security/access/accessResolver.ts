export interface SecurityAccessState {
  read: boolean
  write: boolean
  reason: string | null
}

export function resolveSecurityAccess(): SecurityAccessState {
  return {
    read: true,
    write: false,
    reason: null,
  }
}
