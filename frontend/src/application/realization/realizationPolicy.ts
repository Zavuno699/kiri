export interface RealizationPolicy {
  canRead: boolean
  canRefresh: boolean
  canCommand: boolean
  canMutate: boolean
  reason?: string
}

export function readOnlyPolicy(
  reason?: string,
): RealizationPolicy {
  return {
    canRead: true,
    canRefresh: true,
    canCommand: false,
    canMutate: false,
    reason,
  }
}
