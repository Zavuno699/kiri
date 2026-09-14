import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface PropertyCollectionClient {
  list(
    query?: Record<string, unknown>,
  ): Promise<unknown[]>
}

export function createPropertyCollectionClient(
  client: ResourceClient,
): PropertyCollectionClient {
  return {
    async list(query) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "properties:list",
          domain: "properties",
          path: "/api/v1/properties",
          method: "GET",
          query,
        }) :
        await client.list();

      if (!response.ok) {
        throw new Error(
          "Properties collection request failed.",
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
