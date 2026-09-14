import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

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
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "dashboard:list",
          domain: "dashboard",
          path: "/api/v1/dashboard",
          method: "GET",
          query,
        }) :
        await client.list();

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
