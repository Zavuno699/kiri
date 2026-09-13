import { createResourceStore } from "../../../application/stores/resourceStore"
import type { PropertyRecord } from "../types/property"

export const propertyStore =
  createResourceStore<PropertyRecord>()
