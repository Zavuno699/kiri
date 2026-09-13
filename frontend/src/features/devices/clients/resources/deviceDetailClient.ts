import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface DeviceDetailClient {
  get(id: string): Promise<unknown>
}

export function createDeviceDetailClient(
  client: ResourceClient,
): DeviceDetailClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "devices:" + id,
          domain: "devices",
          path: "/api/v1/devices/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Devices detail request failed.",
        )
      }

      return response.data
    },
  }
}
