import type { DomainModule } from "../../../application/composition/domainModule"
import { propertyModule } from "./propertyModule"

export interface PropertyComposition {
  module: DomainModule
  initialized: boolean
}

export function createPropertyComposition(): PropertyComposition {
  return {
    module: propertyModule,
    initialized: false,
  }
}
