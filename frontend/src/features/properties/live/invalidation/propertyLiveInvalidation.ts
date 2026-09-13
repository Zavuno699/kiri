export interface PropertyLiveInvalidation {
  key: string
  reason: string
  occurredAt: string
}

export function createPropertyLiveInvalidation(
  key: string,
  reason: string,
): PropertyLiveInvalidation {
  return {
    key,
    reason,
    occurredAt:
      new Date().toISOString(),
  }
}
