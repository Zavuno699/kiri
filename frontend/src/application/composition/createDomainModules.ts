import { dashboardModule } from "../../features/dashboard/composition/dashboardModule"
import { propertyModule } from "../../features/properties/composition/propertyModule"
import { leaseModule } from "../../features/leases/composition/leaseModule"
import { paymentModule } from "../../features/payments/composition/paymentModule"
import { deviceModule } from "../../features/devices/composition/deviceModule"
import { lockModule } from "../../features/locks/composition/lockModule"
import { securityModule } from "../../features/security/composition/securityModule"

export function createDomainModules() {
  return [
    dashboardModule,
    propertyModule,
    leaseModule,
    paymentModule,
    deviceModule,
    lockModule,
    securityModule,
  ]
}
