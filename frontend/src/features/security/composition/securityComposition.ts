import type { DomainModule } from "../../../application/composition/domainModule"
import { securityModule } from "./securityModule"

export interface SecurityComposition {
  module: DomainModule
  initialized: boolean
}

export function createSecurityComposition(): SecurityComposition {
  return {
    module: securityModule,
    initialized: false,
  }
}
