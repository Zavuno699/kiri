import type {
  DeviceGateway,
} from "../../application/gateways/deviceGateway"
import {
  createDeviceCoordinator,
} from "../../application/devices/deviceCoordinator"

const coordinator =
  createDeviceCoordinator()

export const deviceGatewayAdapter:
  DeviceGateway = {
  getDevice(id) {
    return coordinator.get(id)
  },
}
