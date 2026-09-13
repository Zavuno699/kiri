import {
  getDevice,
} from "../../api/resources/deviceResource"
import {
  adaptDevice,
} from "../../lib/adapters/deviceAdapter"

export function createDeviceCoordinator() {
  return {
    async get(id: string) {
      const result =
        await getDevice<unknown>(id)

      return adaptDevice(
        result as Record<string, unknown>,
      )
    },
  }
}
