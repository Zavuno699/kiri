import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface LockCollectionClient {
  list(
    query?: Record<string, unknown>,
  ): Promise<unknown[]>
}

export function createLockCollectionClient(
  client: ResourceClient,
): LockCollectionClient {
  return {
    async list(query) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "locks:list",
          domain: "locks",
          path: "/api/v1/locks",
          method: "GET",
          query,
        }) :
        await client.list();

      if (!response.ok) {
        throw new Error(
          "Locks collection request failed.",
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
