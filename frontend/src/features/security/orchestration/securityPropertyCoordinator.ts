export interface SecurityPropertyCoordinator {
  evaluate(
    propertyId: string,
    policy: Record<string, unknown>,
  ): boolean
}

export function createSecurityPropertyCoordinator():
  SecurityPropertyCoordinator {
  return {
    evaluate(propertyId, policy) {
      if (!propertyId) return false

      if (
        typeof policy.enabled === "boolean" &&
        !policy.enabled
      ) {
        return false
      }

      return true
    },
  }
}
