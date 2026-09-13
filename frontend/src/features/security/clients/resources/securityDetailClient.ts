import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface SecurityDetailClient {
  get(id: string): Promise<unknown>
}

export function createSecurityDetailClient(
  client: ResourceClient,
): SecurityDetailClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "security:" + id,
          domain: "security",
          path: "/api/v1/security/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Security detail request failed.",
        )
      }

      return response.data
    },
  }
}
