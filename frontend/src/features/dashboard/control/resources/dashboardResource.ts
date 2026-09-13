import type { ResourceHandle } from "../../../application/control/resourceHandle"

export type DashboardResource =
  ResourceHandle<unknown>

export function createDashboardResource(
  id?: string,
): DashboardResource {
  return {
    key: id
      ? "dashboard:" + id
      : "dashboard:list",
    lifecycle: "idle",
    version: 0,
  }
}
