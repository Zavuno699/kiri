import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface DashboardDetailClient {
  get(id: string): Promise<unknown>
}

export function createDashboardDetailClient(
  client: ResourceClient,
): DashboardDetailClient {
  return {
    async get(id) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "dashboard:" + id,
          domain: "dashboard",
          path: "/api/v1/dashboard/" + id,
          method: "GET",
        }) :
        await client.get(id);

      if (!response.ok) {
        throw new Error(
          "Dashboard detail request failed.",
        )
      }

      return response.data
    },
  }
}
