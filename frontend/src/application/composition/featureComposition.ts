import {
  createDashboardComposition,
} from "../../features/dashboard/composition/dashboardComposition"
import {
  createPropertyComposition,
} from "../../features/properties/composition/propertyComposition"
import {
  createLeaseComposition,
} from "../../features/leases/composition/leaseComposition"
import {
  createPaymentComposition,
} from "../../features/payments/composition/paymentComposition"
import {
  createDeviceComposition,
} from "../../features/devices/composition/deviceComposition"
import {
  createLockComposition,
} from "../../features/locks/composition/lockComposition"
import {
  createSecurityComposition,
} from "../../features/security/composition/securityComposition"

export function createFeatureComposition() {
  return {
    dashboard:
      createDashboardComposition(),

    properties:
      createPropertyComposition(),

    leases:
      createLeaseComposition(),

    payments:
      createPaymentComposition(),

    devices:
      createDeviceComposition(),

    locks:
      createLockComposition(),

    security:
      createSecurityComposition(),
  }
}
