import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

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
      return (client as any).execute ? 
        (client as any).execute({
          key: "security:list",
          domain: "security",
          path: "/api/v1/security",
          method: "GET",
          query,
        }).then((r: any) => r.data?.items ?? []) :
        client.list();
    },
  }
}
