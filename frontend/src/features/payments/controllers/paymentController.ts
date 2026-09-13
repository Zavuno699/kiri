import {
  createPaymentCoordinator,
} from "../../../application/payments/paymentCoordinator"
import { createResourceController } from "../../../application/controllers/resourceController"
import { paymentStore } from "../stores/paymentStore"

const coordinator =
  createPaymentCoordinator()

export const paymentController =
  createResourceController(
    paymentStore,
    () => coordinator.list(),
  )
