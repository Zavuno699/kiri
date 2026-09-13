import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface SecurityStatusClient {
  get(id: string): Promise<unknown>
}

export function createSecurityStatusClient(
  client: ResourceClient,
): SecurityStatusClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "security:status:" + id,
          domain: "security",
          path: "/api/v1/security/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Security status request failed.",
        )
      }

      return response.data
    },
  }
}
