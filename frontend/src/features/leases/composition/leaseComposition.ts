import type { DomainModule } from "../../../application/composition/domainModule"
import { leaseModule } from "./leaseModule"

export interface LeaseComposition {
  module: DomainModule
  initialized: boolean
}

export function createLeaseComposition(): LeaseComposition {
  return {
    module: leaseModule,
    initialized: false,
  }
}
