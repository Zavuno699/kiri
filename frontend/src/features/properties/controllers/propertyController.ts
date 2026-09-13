import {
  createPropertyCoordinator,
} from "../../../application/properties/propertyCoordinator"
import { createResourceController } from "../../../application/controllers/resourceController"
import { propertyStore } from "../stores/propertyStore"

const coordinator =
  createPropertyCoordinator()

export const propertyController =
  createResourceController(
    propertyStore,
    () => coordinator.list(),
  )
