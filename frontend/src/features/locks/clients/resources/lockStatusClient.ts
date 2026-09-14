import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface LockStatusClient {
  get(id: string): Promise<unknown>
}

export function createLockStatusClient(
  client: ResourceClient,
): LockStatusClient {
  return {
    async get(id) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "locks:status:" + id,
          domain: "locks",
          path: "/api/v1/locks/" + id,
          method: "GET",
        }) :
        await client.get(id);

      if (!response.ok) {
        throw new Error(
          "Locks status request failed.",
        )
      }

      return response.data
    },
  }
}
