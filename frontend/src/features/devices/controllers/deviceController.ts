import {
  createDeviceCoordinator,
} from "../../../application/devices/deviceCoordinator"
import { deviceStore } from "../stores/deviceStore"

const coordinator =
  createDeviceCoordinator()

export async function loadDevice(
  id: string,
) {
  deviceStore.setLoading(true)

  try {
    const device =
      await coordinator.get(id)

    deviceStore.setItems([device])
    deviceStore.setSelectedId(id)

    return device
  } catch (error) {
    deviceStore.setError(
      error instanceof Error
        ? error.message
        : "Unable to load device.",
    )

    throw error
  } finally {
    deviceStore.setLoading(false)
  }
}
