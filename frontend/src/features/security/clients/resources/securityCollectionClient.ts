import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface SecurityCollectionClient {
  list(
    query?: Record<string, unknown>,
  ): Promise<unknown[]>
}

export function createSecurityCollectionClient(
  client: ResourceClient,
): SecurityCollectionClient {
  return {
    async list(query) {
      const response =
        await client.execute({
          key: "security:list",
          domain: "security",
          path: "/api/v1/security",
          method: "GET",
          query,
        })

      if (!response.ok) {
        throw new Error(
          "Security collection request failed.",
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
