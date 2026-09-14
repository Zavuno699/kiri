import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface DeviceStatusClient {
  send(
    payload: unknown,
  ): Promise<unknown>
}

export function createDeviceStatusClient(
  client: ResourceClient,
): DeviceStatusClient {
  return {
    async send(payload) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "device:status",
          domain: "device",
          path: "/api/v1/status",
          method: "POST",
          body: payload,
        }) :
        await (client as any).send(payload);

      if (!response.ok) {
        throw new Error(
          "Device status request failed.",
        )
      }

      return response.data
    },
  }
}
