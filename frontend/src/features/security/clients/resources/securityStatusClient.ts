import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface SecurityStatusClient {
  get(id: string): Promise<unknown>
}

export function createSecurityStatusClient(
  client: ResourceClient,
): SecurityStatusClient {
  return {
    async get(id) {
      return (client as any).execute ?
        (client as any).execute({
          key: "security:status:" + id,
          domain: "security",
          path: "/api/v1/security/" + id,
          method: "GET",
        }).then((r: any) => r.data) :
        client.get(id);
    },
  }
}
