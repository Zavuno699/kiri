import {
  registerDashboardInvalidationRules,
} from "../../../features/dashboard/persistence/invalidation/dashboardInvalidationRules";

import {
  registerPropertiesInvalidationRules,
} from "../../../features/properties/persistence/invalidation/propertiesInvalidationRules";

import {
  registerLeasesInvalidationRules,
} from "../../../features/leases/persistence/invalidation/leasesInvalidationRules";

import {
  registerPaymentsInvalidationRules,
} from "../../../features/payments/persistence/invalidation/paymentsInvalidationRules";

import {
  registerDevicesInvalidationRules,
} from "../../../features/devices/persistence/invalidation/devicesInvalidationRules";

import {
  registerLocksInvalidationRules,
} from "../../../features/locks/persistence/invalidation/locksInvalidationRules";

import {
  registerSecurityInvalidationRules,
} from "../../../features/security/persistence/invalidation/securityInvalidationRules";

export function registerCanonicalInvalidationRules(): void {
  registerDashboardInvalidationRules();
  registerPropertiesInvalidationRules();
  registerLeasesInvalidationRules();
  registerPaymentsInvalidationRules();
  registerDevicesInvalidationRules();
  registerLocksInvalidationRules();
  registerSecurityInvalidationRules();
}
