import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface LeaseStatusClient {
  get(id: string): Promise<unknown>
}

export function createLeaseStatusClient(
  client: ResourceClient,
): LeaseStatusClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "leases:status:" + id,
          domain: "leases",
          path: "/api/v1/leases/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Leases status request failed.",
        )
      }

      return response.data
    },
  }
}
