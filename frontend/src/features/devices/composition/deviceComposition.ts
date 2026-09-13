import type { DomainModule } from "../../../application/composition/domainModule"
import { deviceModule } from "./deviceModule"

export interface DeviceComposition {
  module: DomainModule
  initialized: boolean
}

export function createDeviceComposition(): DeviceComposition {
  return {
    module: deviceModule,
    initialized: false,
  }
}
