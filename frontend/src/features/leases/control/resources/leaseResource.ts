import type { ResourceHandle } from "../../../application/control/resourceHandle"

export type LeaseResource =
  ResourceHandle<unknown>

export function createLeaseResource(
  id?: string,
): LeaseResource {
  return {
    key: id
      ? "leases:" + id
      : "leases:list",
    lifecycle: "idle",
    version: 0,
  }
}
