import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface DeviceCommandClient {
  send(
    payload: unknown,
  ): Promise<unknown>
}

export function createDeviceCommandClient(
  client: ResourceClient,
): DeviceCommandClient {
  return {
    async send(payload) {
      const response =
        await client.execute({
          key: "device:command",
          domain: "device",
          path: "/api/v1/command",
          method: "POST",
          body: payload,
        })

      if (!response.ok) {
        throw new Error(
          "Device command request failed.",
        )
      }

      return response.data
    },
  }
}
