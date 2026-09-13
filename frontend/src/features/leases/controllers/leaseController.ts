import {
  createLeaseCoordinator,
} from "../../../application/leases/leaseCoordinator"
import { createResourceController } from "../../../application/controllers/resourceController"
import { leaseStore } from "../stores/leaseStore"

const coordinator =
  createLeaseCoordinator()

export const leaseController =
  createResourceController(
    leaseStore,
    () => coordinator.list(),
  )
