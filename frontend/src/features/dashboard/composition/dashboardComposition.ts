import type { DomainModule } from "../../../application/composition/domainModule"
import { dashboardModule } from "./dashboardModule"

export interface DashboardComposition {
  module: DomainModule
  initialized: boolean
}

export function createDashboardComposition(): DashboardComposition {
  return {
    module: dashboardModule,
    initialized: false,
  }
}
