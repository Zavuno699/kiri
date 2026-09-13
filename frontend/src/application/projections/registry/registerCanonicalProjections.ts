import {
  registerDashboardProjections,
} from "../../../features/dashboard/projections/registerDashboardProjections";

import {
  registerPropertiesProjections,
} from "../../../features/properties/projections/registerPropertiesProjections";

import {
  registerLeasesProjections,
} from "../../../features/leases/projections/registerLeasesProjections";

import {
  registerPaymentsProjections,
} from "../../../features/payments/projections/registerPaymentsProjections";

import {
  registerDevicesProjections,
} from "../../../features/devices/projections/registerDevicesProjections";

import {
  registerLocksProjections,
} from "../../../features/locks/projections/registerLocksProjections";

import {
  registerSecurityProjections,
} from "../../../features/security/projections/registerSecurityProjections";

export function registerCanonicalProjections(): void {
  registerDashboardProjections();
  registerPropertiesProjections();
  registerLeasesProjections();
  registerPaymentsProjections();
  registerDevicesProjections();
  registerLocksProjections();
  registerSecurityProjections();
}
