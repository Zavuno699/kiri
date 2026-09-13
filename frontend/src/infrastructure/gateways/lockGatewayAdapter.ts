import type {
  LockGateway,
} from "../../application/gateways/lockGateway"
import {
  createLockCoordinator,
} from "../../application/locks/lockCoordinator"

const coordinator =
  createLockCoordinator()

export const lockGatewayAdapter:
  LockGateway = {
  listLocks() {
    return coordinator.list()
  },

  sendCommand() {
    return coordinator.executeCommand()
  },
}
