import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface PropertyStatusClient {
  get(id: string): Promise<unknown>
}

export function createPropertyStatusClient(
  client: ResourceClient,
): PropertyStatusClient {
  return {
    async get(id) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "properties:status:" + id,
          domain: "properties",
          path: "/api/v1/properties/" + id,
          method: "GET",
        }) :
        await client.get(id);

      if (!response.ok) {
        throw new Error(
          "Properties status request failed.",
        )
      }

      return response.data
    },
  }
}
