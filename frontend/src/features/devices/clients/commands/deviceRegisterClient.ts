import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface DeviceRegisterClient {
  register(
    payload: unknown,
  ): Promise<unknown>
}

export function createDeviceRegisterClient(
  client: ResourceClient,
): DeviceRegisterClient {
  return {
    async register(payload) {
      const response =
        await client.execute({
          key: "device:register",
          domain: "device",
          path: "/api/v1/register",
          method: "POST",
          body: payload,
        })

      if (!response.ok) {
        throw new Error(
          "Device registration failed.",
        )
      }

      return response.data
    },
  }
}
