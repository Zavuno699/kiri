import type { DomainModule } from "../../../application/composition/domainModule"
import { lockModule } from "./lockModule"

export interface LockComposition {
  module: DomainModule
  initialized: boolean
}

export function createLockComposition(): LockComposition {
  return {
    module: lockModule,
    initialized: false,
  }
}
