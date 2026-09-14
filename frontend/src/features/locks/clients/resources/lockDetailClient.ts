import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface LockDetailClient {
  get(id: string): Promise<unknown>
}

export function createLockDetailClient(
  client: ResourceClient,
): LockDetailClient {
  return {
    async get(id) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "locks:" + id,
          domain: "locks",
          path: "/api/v1/locks/" + id,
          method: "GET",
        }) :
        await client.get(id);

      if (!response.ok) {
        throw new Error(
          "Locks detail request failed.",
        )
      }

      return response.data
    },
  }
}
