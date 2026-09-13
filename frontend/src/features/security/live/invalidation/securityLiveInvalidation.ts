export interface SecurityLiveInvalidation {
  key: string
  reason: string
  occurredAt: string
}

export function createSecurityLiveInvalidation(
  key: string,
  reason: string,
): SecurityLiveInvalidation {
  return {
    key,
    reason,
    occurredAt:
      new Date().toISOString(),
  }
}
