import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface DashboardStatusClient {
  get(id: string): Promise<unknown>
}

export function createDashboardStatusClient(
  client: ResourceClient,
): DashboardStatusClient {
  return {
    async get(id) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "dashboard:status:" + id,
          domain: "dashboard",
          path: "/api/v1/dashboard/" + id,
          method: "GET",
        }) :
        await client.get(id);

      if (!response.ok) {
        throw new Error(
          "Dashboard status request failed.",
        )
      }

      return response.data
    },
  }
}
