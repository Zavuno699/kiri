import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface DeviceCollectionClient {
  list(
    query?: Record<string, unknown>,
  ): Promise<unknown[]>
}

export function createDeviceCollectionClient(
  client: ResourceClient,
): DeviceCollectionClient {
  return {
    async list(query) {
      const response =
        await client.execute({
          key: "devices:list",
          domain: "devices",
          path: "/api/v1/devices",
          method: "GET",
          query,
        })

      if (!response.ok) {
        throw new Error(
          "Devices collection request failed.",
        )
      }

      if (
        response.data &&
        typeof response.data === "object" &&
        "items" in response.data
      ) {
        const data =
          response.data as {
            items?: unknown[]
          }

        return data.items ?? []
      }

      return []
    },
  }
}
