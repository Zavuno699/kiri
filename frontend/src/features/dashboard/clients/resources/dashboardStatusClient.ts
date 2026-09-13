import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface DashboardStatusClient {
  get(id: string): Promise<unknown>
}

export function createDashboardStatusClient(
  client: ResourceClient,
): DashboardStatusClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "dashboard:status:" + id,
          domain: "dashboard",
          path: "/api/v1/dashboard/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Dashboard status request failed.",
        )
      }

      return response.data
    },
  }
}
