import {
  registerDashboardHandlers,
} from "../../../../features/dashboard/handlers/canonical/registration/registerDashboardHandlers";

import {
  registerPropertiesHandlers,
} from "../../../../features/properties/handlers/canonical/registration/registerPropertiesHandlers";

import {
  registerLeasesHandlers,
} from "../../../../features/leases/handlers/canonical/registration/registerLeasesHandlers";

import {
  registerPaymentsHandlers,
} from "../../../../features/payments/handlers/canonical/registration/registerPaymentsHandlers";

import {
  registerDevicesHandlers,
} from "../../../../features/devices/handlers/canonical/registration/registerDevicesHandlers";

import {
  registerLocksHandlers,
} from "../../../../features/locks/handlers/canonical/registration/registerLocksHandlers";

import {
  registerSecurityHandlers,
} from "../../../../features/security/handlers/canonical/registration/registerSecurityHandlers";

import {
  registerCrossDomainHandlers,
} from "../../../crossDomain/registerCrossDomainHandlers";

export function registerCanonicalHandlers(): void {
  registerDashboardHandlers();
  registerPropertiesHandlers();
  registerLeasesHandlers();
  registerPaymentsHandlers();
  registerDevicesHandlers();
  registerLocksHandlers();
  registerSecurityHandlers();

  registerCrossDomainHandlers();
}
