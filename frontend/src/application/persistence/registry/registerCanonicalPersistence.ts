import {
  registerDashboardCache,
} from "../../../features/dashboard/persistence/cache/registerDashboardCache";

import {
  registerPropertiesCache,
} from "../../../features/properties/persistence/cache/registerPropertiesCache";

import {
  registerLeasesCache,
} from "../../../features/leases/persistence/cache/registerLeasesCache";

import {
  registerPaymentsCache,
} from "../../../features/payments/persistence/cache/registerPaymentsCache";

import {
  registerDevicesCache,
} from "../../../features/devices/persistence/cache/registerDevicesCache";

import {
  registerLocksCache,
} from "../../../features/locks/persistence/cache/registerLocksCache";

import {
  registerSecurityCache,
} from "../../../features/security/persistence/cache/registerSecurityCache";

export function registerCanonicalPersistence(): void {
  registerDashboardCache();
  registerPropertiesCache();
  registerLeasesCache();
  registerPaymentsCache();
  registerDevicesCache();
  registerLocksCache();
  registerSecurityCache();
}
