import type { CrossDomainSnapshot } from "../../../application/projections/crossDomainSnapshot"

export interface DashboardSnapshotBuilder {
  build(snapshot: CrossDomainSnapshot): CrossDomainSnapshot
}

export function createDashboardSnapshotBuilder(): DashboardSnapshotBuilder {
  return {
    build(snapshot) {
      return {
        ...snapshot,
        generatedAt: new Date().toISOString(),
      }
    },
  }
}
