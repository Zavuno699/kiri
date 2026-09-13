import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface DashboardCollectionClient {
  list(
    query?: Record<string, unknown>,
  ): Promise<unknown[]>
}

export function createDashboardCollectionClient(
  client: ResourceClient,
): DashboardCollectionClient {
  return {
    async list(query) {
      const response =
        await client.execute({
          key: "dashboard:list",
          domain: "dashboard",
          path: "/api/v1/dashboard",
          method: "GET",
          query,
        })

      if (!response.ok) {
        throw new Error(
          "Dashboard collection request failed.",
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
