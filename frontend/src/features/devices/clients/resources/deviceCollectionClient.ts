import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

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
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "devices:list",
          domain: "devices",
          path: "/api/v1/devices",
          method: "GET",
          query,
        }) :
        await client.list();

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
