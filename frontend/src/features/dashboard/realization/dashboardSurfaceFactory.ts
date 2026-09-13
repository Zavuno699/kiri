import type {
  DashboardSurfaceModel,
} from "../presentation/DashboardSurfaceModel"

export function createDashboardSurface(): DashboardSurfaceModel {
  return {
    title: "Operations",
    subtitle:
      "Live operational state across the KiriLock platform.",
    metrics: [],
  }
}
