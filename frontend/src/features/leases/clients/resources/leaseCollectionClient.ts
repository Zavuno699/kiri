import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface LeaseCollectionClient {
  list(
    query?: Record<string, unknown>,
  ): Promise<unknown[]>
}

export function createLeaseCollectionClient(
  client: ResourceClient,
): LeaseCollectionClient {
  return {
    async list(query) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "leases:list",
          domain: "leases",
          path: "/api/v1/leases",
          method: "GET",
          query,
        }) :
        await client.list();

      if (!response.ok) {
        throw new Error(
          "Leases collection request failed.",
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
