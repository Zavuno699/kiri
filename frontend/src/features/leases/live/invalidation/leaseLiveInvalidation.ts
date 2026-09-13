export interface LeaseLiveInvalidation {
  key: string
  reason: string
  occurredAt: string
}

export function createLeaseLiveInvalidation(
  key: string,
  reason: string,
): LeaseLiveInvalidation {
  return {
    key,
    reason,
    occurredAt:
      new Date().toISOString(),
  }
}
