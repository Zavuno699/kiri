export interface LockLiveInvalidation {
  key: string
  reason: string
  occurredAt: string
}

export function createLockLiveInvalidation(
  key: string,
  reason: string,
): LockLiveInvalidation {
  return {
    key,
    reason,
    occurredAt:
      new Date().toISOString(),
  }
}
