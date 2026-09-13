import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

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
      const response =
        await client.execute({
          key: "device:status",
          domain: "device",
          path: "/api/v1/status",
          method: "POST",
          body: payload,
        })

      if (!response.ok) {
        throw new Error(
          "Device status request failed.",
        )
      }

      return response.data
    },
  }
}
