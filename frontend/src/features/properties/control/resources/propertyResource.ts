import type { ResourceHandle } from "../../../application/control/resourceHandle"

export type PropertyResource =
  ResourceHandle<unknown>

export function createPropertyResource(
  id?: string,
): PropertyResource {
  return {
    key: id
      ? "properties:" + id
      : "properties:list",
    lifecycle: "idle",
    version: 0,
  }
}
