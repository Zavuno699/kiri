import type {
  PaymentGateway,
} from "../../application/gateways/paymentGateway"
import {
  createPaymentCoordinator,
} from "../../application/payments/paymentCoordinator"

const coordinator =
  createPaymentCoordinator()

export const paymentGatewayAdapter:
  PaymentGateway = {
  listPayments() {
    return coordinator.list()
  },

  getPayment(id) {
    return coordinator.get(id)
  },
}
