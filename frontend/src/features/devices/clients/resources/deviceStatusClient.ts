import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface DeviceStatusClient {
  get(id: string): Promise<unknown>
}

export function createDeviceStatusClient(
  client: ResourceClient,
): DeviceStatusClient {
  return {
    async get(id) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "devices:status:" + id,
          domain: "devices",
          path: "/api/v1/devices/" + id,
          method: "GET",
        }) :
        await client.get(id);

      if (!response.ok) {
        throw new Error(
          "Devices status request failed.",
        )
      }

      return response.data
    },
  }
}
