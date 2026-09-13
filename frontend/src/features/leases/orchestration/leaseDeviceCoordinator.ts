export interface LeaseDeviceCoordinator {
  correlate(
    leaseId: string,
    devices: unknown[],
  ): unknown[]
}

export function createLeaseDeviceCoordinator():
  LeaseDeviceCoordinator {
  return {
    correlate(leaseId, devices) {
      return devices.filter((device) => {
        if (
          device === null ||
          typeof device !== "object"
        ) {
          return false
        }

        const candidate =
          device as Record<string, unknown>

        return (
          candidate.leaseId === leaseId ||
          candidate.lease_id === leaseId
        )
      })
    },
  }
}
