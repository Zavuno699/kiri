import type {
  SecurityGateway,
} from "../../application/gateways/securityGateway"
import {
  createSecurityCoordinator,
} from "../../application/security/securityCoordinator"

const coordinator =
  createSecurityCoordinator()

export const securityGatewayAdapter:
  SecurityGateway = {
  getSummary() {
    return coordinator.getSummary()
  },
}
