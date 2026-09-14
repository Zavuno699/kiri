import type { ResourceHandle } from "../../../../application/control/resourceHandle"

export type SecurityResource =
  ResourceHandle<unknown>

export function createSecurityResource(
  id?: string,
): SecurityResource {
  return {
    key: id
      ? "security:" + id
      : "security:list",
    lifecycle: "idle",
    version: 0,
    active: false,
  }
}
