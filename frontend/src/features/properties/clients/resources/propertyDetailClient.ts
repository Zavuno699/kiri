import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface PropertyDetailClient {
  get(id: string): Promise<unknown>
}

export function createPropertyDetailClient(
  client: ResourceClient,
): PropertyDetailClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "properties:" + id,
          domain: "properties",
          path: "/api/v1/properties/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Properties detail request failed.",
        )
      }

      return response.data
    },
  }
}
