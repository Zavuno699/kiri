export interface SecurityLockFlow {
  subjectId?: string
  lockId?: string
  permitted: boolean
}

export function createSecurityLockFlow(
  permitted: boolean,
  subjectId?: string,
  lockId?: string,
): SecurityLockFlow {
  return {
    permitted,
    subjectId,
    lockId,
  }
}
