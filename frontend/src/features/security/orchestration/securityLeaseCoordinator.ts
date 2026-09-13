export interface SecurityLeaseCoordinator {
  evaluate(
    leaseId: string,
    leaseStatus?: string,
  ): boolean
}

export function createSecurityLeaseCoordinator():
  SecurityLeaseCoordinator {
  return {
    evaluate(leaseId, leaseStatus) {
      if (!leaseId) return false

      const status =
        leaseStatus?.toLowerCase()

      return (
        status === undefined ||
        status === "active" ||
        status === "current"
      )
    },
  }
}
