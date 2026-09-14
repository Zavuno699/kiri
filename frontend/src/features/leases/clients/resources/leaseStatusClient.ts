import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface LeaseStatusClient {
  get(id: string): Promise<unknown>
}

export function createLeaseStatusClient(
  client: ResourceClient,
): LeaseStatusClient {
  return {
    async get(id) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "leases:status:" + id,
          domain: "leases",
          path: "/api/v1/leases/" + id,
          method: "GET",
        }) :
        await client.get(id);

      if (!response.ok) {
        throw new Error(
          "Leases status request failed.",
        )
      }

      return response.data
    },
  }
}
