import type { ResourceHandle } from "../../../application/control/resourceHandle"

export type LockResource =
  ResourceHandle<unknown>

export function createLockResource(
  id?: string,
): LockResource {
  return {
    key: id
      ? "locks:" + id
      : "locks:list",
    lifecycle: "idle",
    version: 0,
  }
}
