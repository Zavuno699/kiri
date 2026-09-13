import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface LeaseDetailClient {
  get(id: string): Promise<unknown>
}

export function createLeaseDetailClient(
  client: ResourceClient,
): LeaseDetailClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "leases:" + id,
          domain: "leases",
          path: "/api/v1/leases/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Leases detail request failed.",
        )
      }

      return response.data
    },
  }
}
