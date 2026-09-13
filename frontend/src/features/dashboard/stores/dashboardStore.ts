import { createResourceStore } from "../../../application/stores/resourceStore"
import type { DashboardSnapshot } from "../types/dashboard"

export const dashboardStore =
  createResourceStore<DashboardSnapshot>()
