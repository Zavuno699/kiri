export interface ServicePolicy {
  key: string
  enabled: boolean
}

export function serviceAllowed(
  policy: ServicePolicy,
): boolean {
  return policy.enabled
}
