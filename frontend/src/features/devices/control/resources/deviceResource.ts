import type { ResourceHandle } from "../../../../application/control/resourceHandle"

export type DeviceResource =
  ResourceHandle<unknown>

export function createDeviceResource(
  id?: string,
): DeviceResource {
  return {
    key: id
      ? "devices:" + id
      : "devices:list",
    lifecycle: "idle",
    version: 0,
    active: false,
  }
}
