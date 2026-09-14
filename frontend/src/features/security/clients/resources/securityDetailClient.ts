import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface SecurityDetailClient {
  get(id: string): Promise<unknown>
}

export function createSecurityDetailClient(
  client: ResourceClient,
): SecurityDetailClient {
  return {
    async get(id) {
      return (client as any).execute ?
        (client as any).execute({
          key: "security:" + id,
          domain: "security",
          path: "/api/v1/security/" + id,
          method: "GET",
        }).then((r: any) => r.data) :
        client.get(id);
    },
  }
}
