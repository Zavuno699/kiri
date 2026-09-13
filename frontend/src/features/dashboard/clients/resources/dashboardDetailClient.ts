import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface DashboardDetailClient {
  get(id: string): Promise<unknown>
}

export function createDashboardDetailClient(
  client: ResourceClient,
): DashboardDetailClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "dashboard:" + id,
          domain: "dashboard",
          path: "/api/v1/dashboard/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Dashboard detail request failed.",
        )
      }

      return response.data
    },
  }
}
